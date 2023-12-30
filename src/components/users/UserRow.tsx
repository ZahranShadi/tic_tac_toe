import React from "react";
import { Player } from "../../types/types";

type UserRowProps = {
    user: Player;
    rank: number;
    inTopThree: boolean;
};

const UserRow: React.FC<UserRowProps> = ({ user, rank, inTopThree }) => (
    <tr>
        <td>
            <div className="rankContainer">
                <span className={`rank ${!inTopThree ? "filterGray" : ""}`}>
                    {rank}
                </span>
            </div>
        </td>
        <td>{user.username}</td>
        <td>{user.game_count}</td>
        <td>{Math.round(user.win_rate * 100)}%</td>
    </tr>
);

export default UserRow;
