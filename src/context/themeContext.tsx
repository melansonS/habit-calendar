import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import allThemes from './themeColors';
import simpleColorBlend from '../utils/colorUtils';
import { ThemeNamesEnum } from '../utils/colorTypes';

interface IThemeContext {
  themeName: ThemeNamesEnum;
  setThemeName: React.Dispatch<React.SetStateAction<ThemeNamesEnum>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  themeName: ThemeNamesEnum.RED,
  setThemeName: () => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
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
  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: allThemes[themeName].primary,
      secondary: allThemes[themeName].secondary,
    },
  }), [isDarkMode, themeName]);

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
