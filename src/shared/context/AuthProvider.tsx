import { useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const login = (userId: string) => {
    setIsLoggedIn(true);
    setUserId(userId);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserId("");
  };

  const authContext = {
    isLoggedIn: isLoggedIn,
    userId: userId,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
