import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import buildTheme from '../utils/themeContextUtils';
import { ITheme, ThemeNamesEnum } from '../utils/colorTypes';

interface IThemeContext {
  themeName: ThemeNamesEnum;
  dispatchThemeName: React.Dispatch<React.SetStateAction<ThemeNamesEnum>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  customTheme: Partial<ITheme> | null;
  setCustomTheme: React.Dispatch<React.SetStateAction<Partial<ITheme> | null>>;
}

export const ThemeContext = createContext<IThemeContext>({
  themeName: ThemeNamesEnum.RED,
  dispatchThemeName: () => {},
  isDarkMode: false,
  customTheme: null,
  toggleDarkMode: () => {},
  setCustomTheme: () => {},
});

export function ThemeContextProvider({ children } : {children: React.ReactNode}) {
  const [themeName, setThemeName] = useState<ThemeNamesEnum>(ThemeNamesEnum.INDIGO);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [customTheme, setCustomTheme] = useState<Partial<ITheme> | null>(null);

  const theme = useMemo(
    () => (
      buildTheme(customTheme, themeName, isDarkMode)),
    [isDarkMode, themeName, customTheme],
  );

  const themeContextValue = useMemo(() => ({
    themeName,
    dispatchThemeName: (name: React.SetStateAction<ThemeNamesEnum>) => {
      setCustomTheme(null);
      setThemeName(name);
    },
    toggleDarkMode: () => setIsDarkMode(!isDarkMode),
    isDarkMode,
    customTheme,
    setCustomTheme,
  }), [theme, isDarkMode, customTheme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
