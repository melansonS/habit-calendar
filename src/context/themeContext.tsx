import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeNamesEnum, allThemes } from './themeColors';

interface IThemeContext {
  themeName: ThemeNamesEnum;
  setThemeName: React.Dispatch<React.SetStateAction<ThemeNamesEnum>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  themeName: ThemeNamesEnum.ONE,
  setThemeName: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
});

interface IChildren {
  children: React.ReactNode
}

export function ThemeContextProvider({ children } : IChildren) {
  const [themeName, setThemeName] = useState<ThemeNamesEnum>(ThemeNamesEnum.ONE);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: allThemes[themeName].primary,
    },
  }), [isDarkMode, themeName]);
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
