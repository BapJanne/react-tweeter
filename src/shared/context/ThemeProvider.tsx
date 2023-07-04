import { useState } from "react";

import { ThemeContext } from "./theme-context";

export const ThemeContextProvider = (props: any) => {
  const [theme, setTheme] = useState("lightTheme");

  const setLightThemeHandler = () => {
    setTheme("lightTheme");
  };

  const setDarkThemeHandler = () => {
    setTheme("lightTheme");
  };

  const themeContext = {
    theme: theme,
    setLightTheme: setLightThemeHandler,
    setDarkTheme: setDarkThemeHandler,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {props.children}
    </ThemeContext.Provider>
  );
};
