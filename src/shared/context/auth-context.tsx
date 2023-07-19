import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userId: null | string;
  userName: null | string;
  token: null | any;
  login: (userId: string, userName: string, token: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  userName: null,
  token: null,
  login: (userId: string, userName: string, token: any) => {
    // do nothing, comment to remove eslint rule about empty function
  },
  logout: () => {
    // do nothing, comment to remove eslint rule about empty function
  },
});
