import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IThemeContext {
  themeName: string;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  themeName: 'one',
  setThemeName: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
});

interface IChildren {
  children: React.ReactNode
}

export function ThemeContextProvider({ children } : IChildren) {
  const [themeName, setThemeName] = useState('one');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  }), [isDarkMode]);
  const themeMemo = useMemo(() => ({
    themeName,
    setThemeName,
    toggleDarkMode: () => setIsDarkMode(!isDarkMode),
    isDarkMode,
  }), [theme, isDarkMode]);

  return (
    <ThemeContext.Provider value={themeMemo}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
