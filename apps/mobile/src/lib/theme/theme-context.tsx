import { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

import { darkTheme, lightTheme, type Theme } from "./theme";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [userPreference, setUserPreference] = useState<"light" | "dark" | null>(null);

  const isDark = userPreference !== null ? userPreference === "dark" : systemColorScheme === "dark";

  const toggleTheme = () => {
    setUserPreference((prev) => {
      if (prev === null) {
        return systemColorScheme === "dark" ? "light" : "dark";
      }
      return prev === "dark" ? "light" : "dark";
    });
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
