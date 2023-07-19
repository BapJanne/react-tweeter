import { useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthContextProvider = (props: any) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState<null | string>(null);
  const [userName, setUserName] = useState<null | string>(null);

  const login = (userId: string, userName: string, token: any) => {
    setToken(token);
    setUserId(userId);
    setUserName(userName);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserName(null);
  };

  const authContext = {
    isLoggedIn: !!token,
    token: token,
    userId: userId,
    userName: userName,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
