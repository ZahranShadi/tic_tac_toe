import React, { useEffect, useRef, useState } from "react";
import { Game, GameMove } from "../../types/types";
import "../styles/ticTacToeStyles.css";

const COLUMNS_NUM = 3;

type GameBoardProps = {
  game: Game;
  winningLine: number[] | null;
  usersMove: boolean;
  onMoveMade: (gameMove: GameMove) => void;
};

const GameBoard: React.FC<GameBoardProps> = ({ game, winningLine, usersMove, onMoveMade }) => {
  const [newMove, setNewMove] = useState<GameMove | null>(null);
  const { board, first_player } = game;
  const prevBoard = useRef(board);

  useEffect(() => {
    checkForNewMove();
    prevBoard.current = game.board;
  }, [game]);

  const checkForNewMove = () => {
    for (let i = 0; i < game.board.length; i++) {
      for (let j = 0; j < game.board[0].length; j++) {
        if (game.board[i][j] !== prevBoard.current[i][j]) {
          setNewMove({ row: i, col: j });
          return;
        }
      }
    }
  };

  const handleMove = async (gameMove: GameMove) => {
    setNewMove(gameMove);
    onMoveMade(gameMove);
  };

  const getTileClassName = (row: number, col: number) => {
    const animateNewMove = row == newMove?.row && col == newMove.col;
    const winner = winningLine?.includes(row * COLUMNS_NUM + col);
    const animateWinner = winner && !!newMove;

    if (animateNewMove) {
      return winner ? "winningMove" : "highlighted"
    } else if (winner) {
      return animateWinner ? "highlightedWinner" : "winner"
    }

    return "";
  }

  const renderTile = (row: number, col: number) => {
    const value = board[row][col];

    return (
      <button
        key={`${row}${col}`}
        className={`tile ${getTileClassName(row, col)}`}
        disabled={!!value || !usersMove}
        onClick={() => handleMove({ row, col })}
      >
        {value ? (value === first_player.id ? "X" : "O") : ""}
      </button>
    );
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="boardRow">
          {row.map((_, colIndex) => renderTile(rowIndex, colIndex))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
