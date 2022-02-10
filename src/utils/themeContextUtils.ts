import { createTheme } from '@mui/material/styles';
import allThemes from './themeNames';
import simpleColorBlend from './colorUtils';
import { ITheme } from './colorTypes';

function basePaperBackground(isDarkMode: boolean) {
  return isDarkMode ? '#212121' : '#fff';
}
function baseDefaultBackground(isDarkMode: boolean) {
  return isDarkMode ? '#121212' : '#f9f9f9';
}

const buildTheme = (
  customTheme:Partial<ITheme> | null,
  themeName:string,
  isDarkMode: boolean,
  colorBlendPercent?: number,
) => {
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
      primary: customTheme ? customTheme.primary : allThemes[themeName].primary,
      secondary: customTheme ? customTheme.secondary : allThemes[themeName].secondary,
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
