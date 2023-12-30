import React, { useEffect, useRef, useState } from "react";
import UserRow from "../../components/users/UserRow";
import Loader from "../../components/generic/Loader";
import CustomPopup from "../../components/generic/CustomPopup";
import { useUserApi } from "../../hooks/useUserApi";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import { Player } from "../../types/types";
import { REFRESH_RESULTS, RESULTS_PER_PAGE } from "../../utils/common";
import "../../styles/usersStyles.css";
import "../../styles/tableStyles.css";

type UsersPageProps = {
    pageIndex: number;
    onDataLoaded: (totalResults: number) => void;
}

const UsersPage: React.FC<UsersPageProps> = ({ pageIndex, onDataLoaded }) => {
    const [users, setUsers] = useState<Player[]>([]);
    const { loading, handleAsyncOperation, error, resetError } = useAsyncOperation();
    const { getUsers } = useUserApi();
    const pageIndexRef = useRef(0);

    useEffect(() => {
        pageIndexRef.current = pageIndex;
    });

    const loadUsers = async () => {
        await handleAsyncOperation(async () => {
            // next and prev from the response aren't used because
            // it is possible to generate the necessary urls from
            // the data that has to be saved anyway - page limit and pageIndex
            const data = await getUsers(pageIndexRef.current);
            setUsers(data.results);
            onDataLoaded(data.count);
        }, "Failed to fetch users.");
    };

    useEffect(() => {
        loadUsers();
    }, [pageIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            loadUsers();
        }, REFRESH_RESULTS);
        return () => clearInterval(interval);
    }, []);

    const getRank = (index: number) => {
        return pageIndex * RESULTS_PER_PAGE + index + 1;
    }

    const isInTopThree = (index: number) => {
        return getRank(index) <= 3;
    }

    return (
        <div className="usersContainer">
            {loading && <Loader />}
            {error && (
                <CustomPopup text={error} onClose={resetError} />
            )}
            <div className="tableWrapper">
                <table className="contentTable">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Games Played</th>
                            <th>Win Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <UserRow key={user.id} user={user} rank={getRank(index)} inTopThree={isInTopThree(index)} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersPage;