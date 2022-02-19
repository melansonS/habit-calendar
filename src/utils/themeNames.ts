import {
  blue, purple, green, red, indigo, orange, amber,
} from '@mui/material/colors';
import createPalette from '@mui/material/styles/createPalette';

import { ITheme } from './colorTypes';

const allThemes: {[key: string]: ITheme} = {
  RED: createPalette({
    primary: { main: red[500] },
    secondary: { main: blue[500] },
  }),
  PURPLE: createPalette({
    primary: { main: purple[500] },
    secondary: { main: orange[500] },
  }),
  INDIGO: createPalette({
    primary: { main: indigo[500] },
    secondary: { main: green[500] },
  }),
  FOUREST: createPalette({
    primary: { main: green[500] },
    secondary: { main: amber[500] },
  }),
};

export default allThemes;
