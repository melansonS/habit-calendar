import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import {
  ThemeNamesEnum,
  allThemes,
  simpleColorBlend,
} from './themeColors';

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

function basePaperBackground(isDarkMode: boolean) {
  return isDarkMode ? '#212121' : '#fff';
}
function baseDefaultBackground(isDarkMode: boolean) {
  return isDarkMode ? '#121212' : '#f9f9f9';
}

export function ThemeContextProvider({ children } : IChildren) {
  const [themeName, setThemeName] = useState<ThemeNamesEnum>(ThemeNamesEnum.ONE);
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
        <>
          <Box display="flex" flexDirection="row" p={10}>
            <Box flexGrow={1} p={8} style={{ backgroundColor: defaultPaper }}>
              {defaultPaper}
            </Box>
            <Box flexGrow={1} p={8} style={{ backgroundColor: newPaper }}>
              {newPaper}
            </Box>
            <Box flexGrow={1} p={8} style={{ backgroundColor: theme.palette.primary[isDarkMode ? 'dark' : 'main'] }}>
              {theme.palette.primary[isDarkMode ? 'dark' : 'main']}
            </Box>
          </Box>
          {children}
        </>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
