import {
  blue, purple, green, red, indigo, orange, amber,
} from '@mui/material/colors';

import { ITheme } from './colorTypes';

const allThemes: {[key: string]: ITheme} = {
  RED: {
    primary: red,
    secondary: blue,
  },
  PURPLE: {
    primary: purple,
    secondary: orange,
  },
  INDIGO: {
    primary: indigo,
    secondary: green,
  },
  FOUREST: {
    primary: green,
    secondary: amber,
  },
};

export default allThemes;
