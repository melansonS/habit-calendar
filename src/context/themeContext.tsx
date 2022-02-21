import React, {
  createContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import buildTheme from '../utils/themeContextUtils';
import { LOCAL_THEME_DATA } from '../utils/consts';
import { ITheme, ThemeNamesEnum } from '../utils/colorTypes';
import { BLEND_PERCENT } from '../utils/colorUtils';
import { useUser } from './userContext';

interface IThemeContext {
  dispatchThemeName: React.Dispatch<React.SetStateAction<ThemeNamesEnum>>;
  dispatchColorBlendPercent: React.Dispatch<React.SetStateAction<number>>
  setCustomTheme: React.Dispatch<React.SetStateAction<Partial<ITheme> | null>>;
  toggleDarkMode: () => void;
  themeName: ThemeNamesEnum;
  colorBlendPercent: number
  isDarkMode: boolean;
  customTheme: Partial<ITheme> | null;
  isThemeLoading: boolean;
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
  isThemeLoading: false,
});

export function ThemeContextProvider({ children } : {children: React.ReactNode}) {
  const localThemeString = (localStorage.getItem(LOCAL_THEME_DATA));
  let localTheme;
  if (localThemeString !== null) {
    localTheme = JSON.parse(localThemeString);
  }

  const [themeName, setThemeName] = useState<ThemeNamesEnum>(localTheme?.themeName || ThemeNamesEnum.INDIGO);
  const [isDarkMode, setIsDarkMode] = useState(localTheme?.isDarkMode || false);
  const [customTheme, setCustomTheme] = useState<Partial<ITheme> | null>(null);
  const [colorBlendPercent, setColorBlendPercent] = useState<number>(localTheme?.colorBlendPercent || BLEND_PERCENT);
  const [isThemeLoading, setIsThemeLoading] = useState<boolean>(true);
  const isMounted = useRef(false);
  const { user, isUserLoading, setUser } = useUser();

  useEffect(() => {
    document.body.style.transition = 'background-color 0.4s ease-out';
    if (isUserLoading || !user) {
      setIsThemeLoading(false);
      return;
    }
    const asyncThemeCheck = async () => {
      const userThemeData = user.theme;
      localStorage.setItem(LOCAL_THEME_DATA, JSON.stringify(userThemeData));
      if (userThemeData) {
        if (themeName !== userThemeData.themeName) setThemeName(userThemeData.themeName as ThemeNamesEnum);
        if (isDarkMode !== userThemeData.isDarkMode) setIsDarkMode(userThemeData.isDarkMode);
        if (customTheme !== userThemeData.customTheme) setCustomTheme(userThemeData.customTheme);
        if (colorBlendPercent !== userThemeData.colorBlendPercent) {
          setColorBlendPercent(userThemeData.colorBlendPercent);
        }
      }
      setIsThemeLoading(false);
    };
    asyncThemeCheck();
  }, [user, isUserLoading]);

  useEffect(() => {
    // ref to boolean value prevents the useEffect from running on the first render
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      const updatedTheme = {
        isDarkMode, themeName, customTheme, colorBlendPercent,
      };
      if (user && user.theme) {
        const updatedUser = {
          ...user,
          theme: updatedTheme,
        };
        setUser(updatedUser);
      }
      localStorage.setItem(LOCAL_THEME_DATA, JSON.stringify(updatedTheme));
    }
  }, [isDarkMode, themeName, customTheme, colorBlendPercent]);

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
    isThemeLoading,
  }), [theme, isDarkMode, customTheme, isThemeLoading]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => React.useContext(ThemeContext);
