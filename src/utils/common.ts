import Cookies from "js-cookie"
import { GameStatus } from "../types/types";

export const RESULTS_PER_PAGE = 10;
export const REFRESH_RESULTS = 60000; // while in dashboard users and games are refreshed every 60 seconds

const API_BASE_URL = "https://tictactoe.aboutdream.io";

type FetchOptions = {
    method: FetchMethod;
    headers: {
        [key: string]: string;
    };
    body?: string;
}

export type FetchMethod = "POST" | "GET";

export const getFetchOptions = (method: FetchMethod, useAuthorization: boolean, requestBody?: string) => {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: requestBody || undefined
    }

    const authHeader = { "Authorization": "Bearer " + Cookies.get("authToken") }
    Object.assign(options.headers, useAuthorization && authHeader);

    return options;
}

export const fetchRequest = async (url: string, options: FetchOptions, returnResponse: boolean) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${url}`, options);
        if (!response.ok) {
            throw new Error("");
        }

        if (returnResponse) {
            return await response.json();
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}

export const getGameStatusText = (gameStatus: GameStatus) => {
    switch (gameStatus) {
        case GameStatus.OPEN:
            return "Open";
        case GameStatus.PROGRESS:
            return "In Progress";
        case GameStatus.FINISHED:
            return "Finished";
    }
}