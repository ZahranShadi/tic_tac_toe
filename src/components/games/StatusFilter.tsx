import React, { ChangeEvent } from "react";
import { GameStatus } from "../../types/types";
import { getGameStatusText } from "../../utils/common";

type StatusFilterProps = {
    selectedStatus: GameStatus | "";
    handleStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const StatusFilter: React.FC<StatusFilterProps> = ({ selectedStatus, handleStatusChange }) => (
    <div className="gameStatusFilterContainer">
        <label htmlFor="status">Game Status:</label>
        <div className="select">
            <select id="status" value={selectedStatus} onChange={handleStatusChange}>
                <option value="">All</option>
                {Object.values(GameStatus).map((status) => (
                    <option key={status} value={status}>
                        {getGameStatusText(status)}
                    </option>
                ))}
            </select>
        </div>
    </div>
);

export default StatusFilter;
