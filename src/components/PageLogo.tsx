import React from "react";
import { Game } from "../types/types";
import GameBoard from "./games/GameBoard";
import logoData from "../assets/logoData.json"
import "../index.css";

const PageLogo: React.FC = () => {
    return (
        <div className="pageLogo">
            <GameBoard
                game={logoData.board as Game}
                winningLine={logoData.winningLine}
                usersMove={false}
                onMoveMade={() => { }}
            />
        </div>
    );
};

export default PageLogo;
