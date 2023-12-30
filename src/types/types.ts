export type User = {
  id: number;
  username: string;
};

export interface Player extends User {
  game_count: number;
  win_rate: number;
}

export enum GameStatus {
  OPEN = "open",
  PROGRESS = "progress",
  FINISHED = "finished",
}

export type Game = {
  id: number;
  board: number[][];
  first_player: User;
  second_player: User | null;
  created: string;
  status: GameStatus;
  winner: User | null;
};

export type GameMove = {
  row: number;
  col: number;
};

export enum DashboardTab {
  GAMES = "GAMES",
  USERS = "USERS",
}