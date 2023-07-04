import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "lightTheme",
  setLightTheme: () => {
    // okok
  },
  setDarkTheme: () => {
    // okok
  },
});
