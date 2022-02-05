import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import allThemes from './themeColors';
import simpleColorBlend from '../utils/colorUtils';
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

function basePaperBackground(isDarkMode: boolean) {
  return isDarkMode ? '#212121' : '#fff';
}
function baseDefaultBackground(isDarkMode: boolean) {
  return isDarkMode ? '#121212' : '#f9f9f9';
}

// TODO: major cleanup up all through here...
export function ThemeContextProvider({ children } : {children: React.ReactNode}) {
  const [themeName, setThemeName] = useState<ThemeNamesEnum>(ThemeNamesEnum.INDIGO);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [customTheme, setCustomTheme] = useState<Partial<ITheme> | null>(null);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: customTheme ? customTheme.primary : allThemes[themeName].primary,
      secondary: customTheme ? customTheme.secondary : allThemes[themeName].secondary,
    },
  }), [isDarkMode, themeName, customTheme]);

  const defaultPaper = basePaperBackground(isDarkMode);
  const newPaper = simpleColorBlend(
    defaultPaper,
    theme.palette.primary[isDarkMode ? 'dark' : 'light'],
  );
  theme.palette.background.paper = newPaper;

  const newBackground = simpleColorBlend(
    baseDefaultBackground(isDarkMode),
    theme.palette.primary[isDarkMode ? 'dark' : 'main'],
  );
  theme.palette.background.default = newBackground;

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
