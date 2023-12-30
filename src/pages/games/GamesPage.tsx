import React, { useRef, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import StatusFilter from "../../components/games/StatusFilter";
import GameRow from "../../components/games/GameRow";
import CustomPopup from "../../components/generic/CustomPopup";
import Loader from "../../components/generic/Loader";
import { useGameApi } from "../../hooks/useGameApi";
import { useAuthApi } from "../../hooks/useAuthApi";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import { Game, GameStatus } from "../../types/types";
import { REFRESH_RESULTS } from "../../utils/common";
import "../../styles/gamesStyles.css";
import "../../styles/tableStyles.css";
import "../../styles/buttonsStyles.css";

type GamesPageProps = {
  pageIndex: number;
  onDataLoaded: (totalResults: number) => void;
};

const GamesPage: React.FC<GamesPageProps> = ({ pageIndex, onDataLoaded }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<GameStatus | "">("");
  const { getGames, createGame, joinGame } = useGameApi();
  const { getLoggedUser } = useAuthApi();
  const { loading, handleAsyncOperation, error, resetError } = useAsyncOperation();
  const pageIndexRef = useRef(0);
  const selectedStatusRef = useRef<GameStatus | "">("");

  useEffect(() => {
    pageIndexRef.current = pageIndex;
    selectedStatusRef.current = selectedStatus;
  });

  const handleCreateGame = async () => {
    await handleAsyncOperation(async () => {
      const gameData = await createGame();
      setSelectedGame(gameData.id);
    }, "Failed to create game.");
  };

  const loadGames = async () => {
    await handleAsyncOperation(async () => {
      const data = await getGames(pageIndexRef.current, selectedStatusRef.current);
      setGames(data.results);
      onDataLoaded(data.count);
    }, "Failed to fetch games.");
  };

  useEffect(() => {
    loadGames();
  }, [pageIndex, selectedStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadGames();
    }, REFRESH_RESULTS);
    return () => clearInterval(interval);
  }, []);

  const handleJoinGameClick = (game: Game) => {
    if (game.first_player.id === getLoggedUser()?.id || game.second_player) {
      setSelectedGame(game.id);
    } else {
      joinSelectedGame(game.id);
    }
  };

  const joinSelectedGame = async (gameId: number) => {
    await handleAsyncOperation(async () => {
      await joinGame(gameId);
      setSelectedGame(gameId);
    }, "Failed to join game.");
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value as GameStatus);
  };

  return (
    <div className="gamesContainer">
      {loading && <Loader />}
      {error && (
        <CustomPopup text={error} onClose={resetError} />
      )}
      <div className="gamesSettingsContainer">
        <button className="customButton" onClick={handleCreateGame}>Create New Game</button>
        <StatusFilter selectedStatus={selectedStatus} handleStatusChange={handleStatusChange} />
      </div>
      <div className="tableWrapper">
        <table className="contentTable">
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Game Status</th>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Winner</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <GameRow key={game.id} game={game} joinClicked={() => handleJoinGameClick(game)} />
            ))}
          </tbody>
        </table>
      </div>
      {selectedGame && <Navigate to={`/game/${selectedGame}`} />}
    </div>
  );
};

export default GamesPage;
