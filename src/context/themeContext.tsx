import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import buildTheme from '../utils/themeContextUtils';
import { ITheme, ThemeNamesEnum } from '../utils/colorTypes';
import { BLEND_PERCENT } from '../utils/colorUtils';

interface IThemeContext {
  dispatchThemeName: React.Dispatch<React.SetStateAction<ThemeNamesEnum>>;
  dispatchColorBlendPercent: React.Dispatch<React.SetStateAction<number>>
  setCustomTheme: React.Dispatch<React.SetStateAction<Partial<ITheme> | null>>;
  toggleDarkMode: () => void;
  themeName: ThemeNamesEnum;
  colorBlendPercent: number
  isDarkMode: boolean;
  customTheme: Partial<ITheme> | null;
}

export const ThemeContext = createContext<IThemeContext>({
  dispatchThemeName: () => {},
  dispatchColorBlendPercent: () => {},
  setCustomTheme: () => {},
  toggleDarkMode: () => {},
  themeName: ThemeNamesEnum.RED,
  colorBlendPercent: BLEND_PERCENT,
  isDarkMode: false,
  customTheme: null,
});

export function ThemeContextProvider({ children } : {children: React.ReactNode}) {
  const [themeName, setThemeName] = useState<ThemeNamesEnum>(ThemeNamesEnum.INDIGO);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [customTheme, setCustomTheme] = useState<Partial<ITheme> | null>(null);
  const [colorBlendPercent, setColorBlendPercent] = useState<number>(BLEND_PERCENT);

  const theme = useMemo(
    () => (
      buildTheme(customTheme, themeName, isDarkMode, colorBlendPercent)),
    [isDarkMode, themeName, customTheme, colorBlendPercent],
  );

  const themeContextValue = useMemo(() => ({
    setCustomTheme,
    dispatchThemeName: (name: React.SetStateAction<ThemeNamesEnum>) => {
      setCustomTheme(null);
      setThemeName(name);
    },
    dispatchColorBlendPercent: (amount: React.SetStateAction<number>) => setColorBlendPercent(amount),
    toggleDarkMode: () => setIsDarkMode(!isDarkMode),
    themeName,
    colorBlendPercent,
    isDarkMode,
    customTheme,
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
