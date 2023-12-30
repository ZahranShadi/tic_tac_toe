import Cookies from "js-cookie";
import { User } from "../types/types";
import { useLocalStorage } from "./useLocalStorage";
import { fetchRequest, getFetchOptions } from "../utils/common";

const AUTH_TOKENS_DURATION: number = 1; // token saved for 1 day

export const useAuthApi = () => {
  const [storedUser, setStoredUser] = useLocalStorage<User | null>("user", null);

  const loginUser = async (username: string, password: string) => {
    const body = JSON.stringify({ username, password });
    const data = await fetchRequest("login/", getFetchOptions("POST", false, body), true);

    Cookies.set("authToken", data.token, { expires: AUTH_TOKENS_DURATION });
    Cookies.set("userId", data.id, { expires: AUTH_TOKENS_DURATION });
    setStoredUser({ id: data.id, username: data.username });
  };

  const logoutUser = async () => {
    await fetchRequest("logout/", getFetchOptions("POST", true), false);

    Cookies.remove("authToken");
    Cookies.remove("userId");
    setStoredUser(null);
  }

  const registerUser = async (username: string, password: string) => {
    const body = JSON.stringify({ username, password });
    await fetchRequest("register/", getFetchOptions("POST", false, body), false);
  }

  const getLoggedUser = (): User | null => {
    return storedUser;
  }

  const isUserLoggedIn = (): boolean => {
    const authToken = Cookies.get("authToken");
    return !!authToken;
  };

  return { loginUser, logoutUser, registerUser, isUserLoggedIn, getLoggedUser };
};