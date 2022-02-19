import { createTheme } from '@mui/material/styles';
import createPalette from '@mui/material/styles/createPalette';
import allThemes from './themeNames';
import simpleColorBlend
, { desaturateColor }
  from './colorUtils';
import { ITheme } from './colorTypes';

declare module '@mui/material/styles' {
  interface Palette {
    darkThemeColors?: Partial<ITheme>;
    lightThemeColors?: Partial<ITheme>;
  }
  interface PaletteOptions {
    darkThemeColors?: Partial<ITheme>;
    lightThemeColors?: Partial<ITheme>;
  }
}

function basePaperBackground(isDarkMode: boolean) {
  return isDarkMode ? '#212121' : '#fff';
}
function baseDefaultBackground(isDarkMode: boolean) {
  return isDarkMode ? '#121212' : '#f9f9f9';
}

const makeDarkModeColors = (color: Partial<ITheme>) => createPalette({
  primary: { main: desaturateColor(color.primary?.main!) },
  secondary: { main: desaturateColor(color.secondary?.main!) },
});

const buildTheme = (
  customTheme:Partial<ITheme> | null,
  themeName:string,
  isDarkMode: boolean,
  colorBlendPercent?: number,
) => {
  const lightThemeColors = customTheme || allThemes[themeName];
  const darkthemeColors = makeDarkModeColors(lightThemeColors);
  const themeColors = isDarkMode ? darkthemeColors : lightThemeColors;
  const theme = createTheme({
    typography: {
      fontFamily: 'Open Sans',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color .5s ease-out',
          },
        },
      },
    },
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: themeColors.primary,
      secondary: themeColors.secondary,
      darkThemeColors: darkthemeColors,
      lightThemeColors,
    },
  });
  const defaultPaper = basePaperBackground(isDarkMode);
  const newPaper = simpleColorBlend(
    defaultPaper,
    theme.palette.primary[isDarkMode ? 'dark' : 'light'],
    colorBlendPercent,
  );
  theme.palette.background.paper = newPaper;
  const newBackground = simpleColorBlend(
    baseDefaultBackground(isDarkMode),
    theme.palette.primary[isDarkMode ? 'dark' : 'main'],
    colorBlendPercent,
  );
  theme.palette.background.default = newBackground;
  return theme;
};

export default buildTheme;
