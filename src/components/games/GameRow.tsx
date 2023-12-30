import React from "react";
import { Game, GameStatus, User } from "../../types/types";
import { useAuthApi } from "../../hooks/useAuthApi";
import { getGameStatusText } from "../../utils/common";
import "../../styles/buttonsStyles.css";

type GameRowProps = {
    game: Game;
    joinClicked: () => void;
};

const GameRow: React.FC<GameRowProps> = ({ game, joinClicked }) => {
    const { getLoggedUser } = useAuthApi();

    const isUser = (player: User | null) => {
        return player?.id === getLoggedUser()?.id;
    }

    const getUsernameString = (player: User | null): string => {
        if (player) {
            return `${player.username}${isUser(player) ? " (YOU)" : ""}`
        }

        return "";
    }

    const getWinnerString = (): string => {
        if (game.status === GameStatus.FINISHED) {
            return game.winner ? getUsernameString(game.winner) : "Tie"
        }

        return "";
    }

    return (
        <tr>
            <td>{game.id}</td>
            <td>{getGameStatusText(game.status)}</td>
            <td>{getUsernameString(game.first_player)}</td>
            <td>{getUsernameString(game.second_player)}</td>
            <td>{getWinnerString()}</td>
            <td>{new Date(game.created).toLocaleString()}</td>
            <td>
                <button className="customButton" onClick={joinClicked}>Join Game</button>
            </td>
        </tr>
    )
}

export default GameRow;
