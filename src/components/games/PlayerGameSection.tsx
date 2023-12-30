import React from "react";
import { Player } from "../../types/types";
import "../styles/ticTacToeStyles.css";

type PlayerGameSectionProps = {
    player: Player | null;
    playersMove: boolean;
    symbol: string;
};

const PlayerGameSection: React.FC<PlayerGameSectionProps> = ({ player, playersMove, symbol }) => {
    console.log(player)
    return (
        <div className={`player ${playersMove ? "active" : ""}`}>
            {player &&
                (<div>
                    <h1>{player?.username}</h1>
                    <p>ID: {player?.id}</p>
                    <p>Games Played: {player?.game_count}</p>
                    <p>Win Rate: {Math.round(player.win_rate * 100)}%</p>
                    <p>Symbol: {symbol}</p>
                </div>)
            }
        </div>
    );
};

export default PlayerGameSection;
