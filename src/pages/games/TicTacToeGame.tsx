import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameBoard from "../../components/games/GameBoard";
import Loader from "../../components/generic/Loader";
import CustomPopup from "../../components/generic/CustomPopup";
import PlayerGameSection from "../../components/games/PlayerGameSection";
import { useAuthApi } from "../../hooks/useAuthApi";
import { useGameApi } from "../../hooks/useGameApi";
import { useUserApi } from "../../hooks/useUserApi";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import { Player, Game, GameStatus, GameMove } from "../../types/types";
import "../../styles/buttonsStyles.css";
import "../../styles/ticTacToeStyles.css";

const REFRESH_GAME_INTERVAL = 3000;

const WINNER_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

type Players = {
  first: Player;
  second: Player | null;
}

const TicTacToeGame: React.FC = () => {
  const { gameId } = useParams();
  const { getUser } = useUserApi();
  const navigate = useNavigate();
  const { getLoggedUser } = useAuthApi();
  const { getGame, joinGame, makeMove } = useGameApi();
  const { loading, handleAsyncOperation, error, resetError } = useAsyncOperation();
  const [game, setGame] = useState<Game | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [players, setPlayers] = useState<Players | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const currentPlayerRef = useRef(currentPlayer);
  const intervalRef = useRef<number | undefined>();

  useEffect(() => {
    currentPlayerRef.current = currentPlayer;
  });

  useEffect(() => {
    refreshGame();
  }, [gameId]);

  useEffect(() => {
    if (game) {
      if (game.status === GameStatus.FINISHED) {
        const [winningLine] = getWinner(game.board);
        setWinningLine(winningLine);
      } else if (game.status === GameStatus.PROGRESS && players) {
        setCurrentPlayer(
          game.board.flat().filter((value) => !!value).length % 2 === 0
            ? players.first
            : players.second
        );
        return;
      }
    }

    setCurrentPlayer(null);
  }, [game, players]);

  useEffect(() => {
    if (game && game.status !== GameStatus.FINISHED) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (!currentPlayerRef.current || currentPlayerRef.current.id !== getLoggedUser()?.id) {
          refreshGame();
        }
      }, REFRESH_GAME_INTERVAL);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [game]);

  const loadPlayersData = async (data: Game) => {
    if (!players || !players.second) {
      await handleAsyncOperation(async () => {
        const first = await getUser(Number(data.first_player.id));

        let second = null;
        if (data.second_player) {
          second = await getUser(Number(data.second_player.id));
        }
        setPlayers({ first, second });
      }, "Failed to get players data.", false);
    }
  }

  const refreshGame = async () => {
    await handleAsyncOperation(async () => {
      const data: Game = await getGame(Number(gameId));
      setGame(data);
      await loadPlayersData(data);
    }, "Failed to refresh game.", false);
  };

  const joinSelectedGame = async (gameId: number) => {
    await handleAsyncOperation(async () => {
      await joinGame(gameId);
    }, "Failed to join game.");
  };

  const onMoveMade = async (gameMove: GameMove) => {
    if (game && currentPlayer && players) {
      const { row, col } = gameMove;
      const newBoard = JSON.parse(JSON.stringify(game.board));
      newBoard[row][col] = currentPlayer.id;

      const [winningLine, winner] = getWinner(newBoard);

      setCurrentPlayer(currentPlayer.id === players.first.id ? players.second : players.first);
      setWinningLine(winningLine);
      setGame({
        ...game,
        status: winner ? GameStatus.FINISHED : game.status,
        winner,
        board: newBoard
      });

      await handleAsyncOperation(async () => {
        await makeMove(game.id, row, col);
        await refreshGame();
      }, "Failed to make move and refresh game.", false);
    }
  }

  const getWinner = (board: number[][]): [number[] | null, Player | null] => {
    if (!game || !players) {
      return [null, null];
    }

    const flatBoard = board.flat();
    for (let i = 0; i < WINNER_LINES.length; i++) {
      const [a, b, c] = WINNER_LINES[i];
      if (flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[a] === flatBoard[c]) {
        const winner = flatBoard[a] === players.first.id ? players.first : players.second;
        return [WINNER_LINES[i], winner];
      }
    }

    return [null, null];
  }

  const getGameStatusText = (): string => {
    switch (game?.status) {
      case GameStatus.OPEN: {
        return "Waiting for opponent...";
      }
      case GameStatus.PROGRESS: {
        return `Current Turn: ${currentPlayer?.username} ${currentPlayer?.id === getLoggedUser()?.id ? "(YOU)" : ""}`;
      }
      case GameStatus.FINISHED: {
        if (game.winner) {
          return `Winner: ${game.winner.username} ${game.winner.id == getLoggedUser()?.id ? "(YOU)" : ""}`;
        } else {
          return "Result: Tie";
        }
      }
    }

    return "";
  }

  if (!game || loading) {
    return <Loader />;
  }

  const showJoinButton = game && !game.second_player && game.first_player.id !== getLoggedUser()?.id;
  return (
    <div className="gamePageContainer">
      {error && (
        <CustomPopup text={error} onClose={resetError} />
      )}
      <div className="gameContainer">
        <div className="gameStatusContainer">
          <p className="gameStatusText">{getGameStatusText()}</p>
        </div>
        <div className="boardContainer">
          <PlayerGameSection player={players?.first || null}
            playersMove={(currentPlayer && players) ? players.first.id === currentPlayer.id : false} symbol="X" />
          <GameBoard
            game={game}
            winningLine={winningLine}
            usersMove={currentPlayer?.id === getLoggedUser()?.id}
            onMoveMade={onMoveMade}
          />
          <PlayerGameSection player={players?.second || null}
            playersMove={(currentPlayer && players && players.second) ? players.second.id === currentPlayer.id : false} symbol="O" />
        </div>
        <div className="gameButtonsContainer">
          {showJoinButton && <button className="customButton" onClick={() => joinSelectedGame(game.id)}>Join Game</button>}
          <button className="customButton" onClick={() => navigate("/dashboard")}>Leave Game</button>
        </div>
      </div>
    </div >
  );
};

export default TicTacToeGame;