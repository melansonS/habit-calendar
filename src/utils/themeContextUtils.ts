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

const buildTheme = (customTheme:Partial<ITheme> | null, themeName:string, isDarkMode: boolean) => {
  const theme = createTheme({
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
  );
  theme.palette.background.paper = newPaper;
  const newBackground = simpleColorBlend(
    baseDefaultBackground(isDarkMode),
    theme.palette.primary[isDarkMode ? 'dark' : 'main'],
  );
  theme.palette.background.default = newBackground;
  return theme;
};

export default buildTheme;
