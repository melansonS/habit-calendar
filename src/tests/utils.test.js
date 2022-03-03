import { hexToRGB, stripRGBA } from '../utils/colorUtils';

const redErrorObject = {
  r: 255,
  g: 0,
  b: 0,
};

describe('stripping rgb', () => {
  const rgbColor = 'rgb(255, 0, 168)';
  const rgbaColor = 'rgba(1,2,3,4)';
  const strippedRGB = stripRGBA(rgbColor);
  const strippedRGBA = stripRGBA(rgbaColor);

  test('split r g b values into an object', () => {
    expect(strippedRGB).toEqual({
      r: 255,
      g: 0,
      b: 168,
    });
  });

  test('alpha value is left undefined when omited', () => {
    expect(strippedRGB.a).toBe(undefined);
  });

  test('alpha value is properly added', () => {
    expect(strippedRGBA.a).toBeDefined();
    expect(strippedRGBA.a).toBe(4);
  });

  test('invalid rgb string return {red, 0, 0} ', () => {
    const invalidRGB = stripRGBA('adffeq');
    expect(invalidRGB).toEqual(redErrorObject);
  });

  test('empty rgb string return {red, 0, 0} ', () => {
    const invalidRGB = stripRGBA('');
    expect(invalidRGB).toEqual(redErrorObject);
  });
});

describe('converting hex colors to rgb', () => {
  const hexTeal = '#008080';
  const rgbTeal = hexToRGB(hexTeal);
  const rgbaTeal = hexToRGB(`${hexTeal}11`);
  // const rgbTeal = 'rgb(0, 128, 128)';

  test('turns hex color into {r, g, b} object', () => {
    expect(rgbTeal).toEqual({
      r: 0,
      g: 128,
      b: 128,
    });
  });

  test('converts alpha value as well', () => {
    expect(rgbaTeal.a).toBeDefined();
  });

  test('invalid rgb string return {red, 0, 0} ', () => {
    const notAColor = hexToRGB('oifhe');
    expect(notAColor).toEqual(redErrorObject);
  });

  test('empty rgb string return {red, 0, 0} ', () => {
    const notAColor = hexToRGB('');
    expect(notAColor).toEqual(redErrorObject);
  });

  test('for short form hex values to be accepted ie; #FFF', () => {
    const shortFormHex = hexToRGB('#888');
    expect(shortFormHex.r).toBeDefined();
    expect(shortFormHex.g).toBeDefined();
    expect(shortFormHex.b).toBeDefined();
  });
});
