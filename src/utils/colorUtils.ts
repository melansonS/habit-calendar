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
    a: a ? parseFloat(r) : undefined,
  };
}

export function ConvertRGBAtoHex(r:number, g:number, b:number, a?: number):string {
  return `#${ColorToHex(r)}${ColorToHex(g)}${ColorToHex(b)}${a ? AlphaToHex(a) : ''}`;
}

export default function simpleColorBlend(c1 : string, c2 : string, percentage = 0.2) {
  const color1 = c1.includes('rgb') ? stripRGBA(c1) : HexToRGB(c1);
  const color2 = c2.includes('rgb') ? stripRGBA(c2) : HexToRGB(c2);
  console.log(c1, c2, color1, color2);
  const a = color1.a || color2.a;
  const color3 = [
    Math.round((1 - percentage) * color1.r + percentage * color2.r),
    Math.round((1 - percentage) * color1.g + percentage * color2.g),
    Math.round((1 - percentage) * color1.b + percentage * color2.b),
  ];
  if (a) {
    color3[3] = color1.a && color2.a ? (1 - percentage) * color1.a + percentage * color2.a : a;
  }
  return ConvertRGBAtoHex(color3[0], color3[1], color3[2], color3[3] || undefined);
}
