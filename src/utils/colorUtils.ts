import { PaletteColor, Color } from '@mui/material';
import { TypeText } from '@mui/material/styles/createPalette';
import { IColor } from './colorTypes';

function ColorToHex(color:number): string {
  const hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? `0${hexadecimal}` : hexadecimal;
}

function AlphaToHex(alpha: number): string {
  return (Math.round(alpha * 255)).toString(16);
}

function HexToRGB(hex: string): {r:number, g: number, b:number, a?: number} {
  if (hex.length === 4) {
    return { r: parseInt(hex[1].repeat(2), 16), g: parseInt(hex[2].repeat(2), 16), b: parseInt(hex[3].repeat(2), 16) };
  } if (hex.length === 7) {
    const [r, g, b] = hex.slice(1).match(/.{1,2}/g) as Array<string>;
    return { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) };
  } if (hex.length === 9) {
    const [r, g, b, a] = hex.slice(1).match(/.{1,2}/g) as Array<string>;
    return {
      r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16), a: parseInt(a, 16) / 255,
    };
  }
  console.error('hey! something is wrong with the colors!', { hex });
  return { r: 255, g: 0, b: 0 }; // Red for Error
}

export function stripRGBA(s: string) {
  const [r, g, b, a] = s.slice(s.indexOf('(') + 1, s.indexOf(')')).split(', ');

  return {
    r: parseInt(r, 10),
    g: parseInt(g, 10),
    b: parseInt(b, 10),
    a: a ? parseFloat(a) : undefined,
  };
}

export const BLEND_PERCENT = 0.02;
export const BLEND_STEP = 0.04;

export function ConvertRGBAtoHex(r:number, g:number, b:number, a?: number):string {
  return `#${ColorToHex(r)}${ColorToHex(g)}${ColorToHex(b)}${a ? AlphaToHex(a) : ''}`;
}

export default function simpleColorBlend(c1 : string, c2 : string, percentage = BLEND_PERCENT) {
  const color1 = c1.includes('rgb') ? stripRGBA(c1) : HexToRGB(c1);
  const color2 = c2.includes('rgb') ? stripRGBA(c2) : HexToRGB(c2);
  const a = color1.a || color2.a;
  let p = percentage;
  if (p <= 0 || p >= 1) { p = 0.2; }
  const color3 = [
    Math.round((1 - p) * color1.r + p * color2.r),
    Math.round((1 - p) * color1.g + p * color2.g),
    Math.round((1 - p) * color1.b + p * color2.b),
  ];
  if (a) {
    color3[3] = color1.a && color2.a ? (1 - p) * color1.a + percentage * color2.a : a;
  }
  return ConvertRGBAtoHex(color3[0], color3[1], color3[2], color3[3] || undefined);
}

const DARK_MODE_SATURATION = 0.6;
export function desaturateColor(color: string) {
  // https://stackoverflow.com/questions/13348129/using-native-javascript-to-desaturate-a-colour/13355255
  const col = color.includes('rgb') ? stripRGBA(color) : HexToRGB(color);
  const sat = DARK_MODE_SATURATION;
  // https:// en.m.wikipedia.org/wiki/Grayscale#Luma_coding_in_video_systems
  const gray = col.r * 0.3086 + col.g * 0.6094 + col.b * 0.0820;

  col.r = Math.round(col.r * sat + gray * (1 - sat));
  col.g = Math.round(col.g * sat + gray * (1 - sat));
  col.b = Math.round(col.b * sat + gray * (1 - sat));
  return ConvertRGBAtoHex(col.r, col.g, col.b);
}

const USEFULCOLORS = ['main', 'light', 'dark', 'primary', 'secondary', 'disabled'];
export const destructurePaletteColor = (colors:
  PaletteColor | TypeText | Color | Partial<IColor>) => Object.keys(colors)
  .map((color, index) => {
    let colorValue = Object.values(colors)[index];
    if (colorValue.includes('rgb')) {
      const {
        r, g, b, a,
      } = stripRGBA(colorValue);
      colorValue = ConvertRGBAtoHex(r, g, b, a);
    }

    return ({
      name: color,
      value: colorValue,
    });
  }).filter((color) => USEFULCOLORS.includes(color.name));
