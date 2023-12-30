import { RESULTS_PER_PAGE, fetchRequest, getFetchOptions } from "../utils/common";

export const useUserApi = () => {
    const getUsers = async (pageIndex: number) => {
        const url = `users/?limit=${RESULTS_PER_PAGE}&offset=${pageIndex * RESULTS_PER_PAGE}`;
        return await fetchRequest(url, getFetchOptions("GET", true), true);
    };

    const getUser = async (userId: number) => {
        return await fetchRequest(`users/${userId}/`, getFetchOptions("GET", true), true);
    };

    return { getUser, getUsers };
};