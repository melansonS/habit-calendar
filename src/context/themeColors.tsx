import {
  blue, purple, green, red, indigo, orange, amber,
} from '@mui/material/colors';

export enum ThemeNamesEnum {
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
}

interface IColor {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

interface ITheme {
  primary: IColor;
  secondary: IColor;
}

export const allThemes: {[key: string]: ITheme} = {
  ONE: {
    primary: red,
    secondary: blue,
  },
  TWO: {
    primary: purple,
    secondary: orange,
  },
  THREE: {
    primary: indigo,
    secondary: green,
  },
  FOUR: {
    primary: green,
    secondary: amber,
  },
};

function ColorToHex(color:number): string {
  const hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
}

function HexToRGB(hex: string): {r:number, g: number, b:number} {
  if (hex.length === 4) {
    return { r: parseInt(hex[1].repeat(2), 16), g: parseInt(hex[2].repeat(2), 16), b: parseInt(hex[3].repeat(2), 16) };
  } if (hex.length === 7) {
    const [r, g, b] = hex.slice(1).match(/.{1,2}/g) as Array<string>;
    return { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) };
  }
  return { r: 255, g: 0, b: 0 }; // Red for Error
}

function ConvertRGBtoHex(r:number, g:number, b:number):string {
  return `#${ColorToHex(r)}${ColorToHex(g)}${ColorToHex(b)}`;
}

export function simpleColorBlend(c1 : string, c2 : string, percentage = 0.02) {
  const color1 = HexToRGB(c1);
  const color2 = HexToRGB(c2);
  const color3 = [
    Math.round((1 - percentage) * color1.r + percentage * color2.r),
    Math.round((1 - percentage) * color1.g + percentage * color2.g),
    Math.round((1 - percentage) * color1.b + percentage * color2.b),
  ];
  return ConvertRGBtoHex(color3[0], color3[1], color3[2]);
}
