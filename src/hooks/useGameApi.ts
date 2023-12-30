import { GameStatus } from "../types/types";
import { RESULTS_PER_PAGE, fetchRequest, getFetchOptions } from "../utils/common";

export const useGameApi = () => {
  const getGames = async (pageIndex: number, gameStatus: GameStatus | "") => {
    const url = `games/?limit=${RESULTS_PER_PAGE}&offset=${pageIndex * RESULTS_PER_PAGE}&status=${gameStatus}`;
    return await fetchRequest(url, getFetchOptions("GET", true), true);
  };

  const getGame = async (gameId: number) => {
    return await fetchRequest(`games/${gameId}/`, getFetchOptions("GET", true), true);
  };

  const createGame = async () => {
    return await fetchRequest(`games/`, getFetchOptions("POST", true), true);
  };

  const joinGame = async (gameId: number) => {
    await fetchRequest(`games/${gameId}/join/`, getFetchOptions("POST", true), false);
  };

  const makeMove = async (gameId: number, row: number, col: number) => {
    const body = JSON.stringify({ row, col });
    await fetchRequest(`games/${gameId}/move/`, getFetchOptions("POST", true, body), false);
  };

  return { getGame, getGames, createGame, joinGame, makeMove };
};