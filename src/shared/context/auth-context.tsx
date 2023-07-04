import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "",
  login: (userId: string) => {
    // do nothing, comment to remove eslint rule about empty function
  },
  logout: () => {
    // do nothing, comment to remove eslint rule about empty function
  },
});
