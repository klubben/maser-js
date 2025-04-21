export const parseHexColor = (hex: string): number =>
  Number(hex.replace("#", "0x"));

export const parseHexColorF32A = (
  hex: string,
  alpha?: number,
): Float32Array => {
  const hexColor = parseHexColor(hex);
  return new Float32Array([
    ((hexColor >> 16) & 0xff) / 255,
    ((hexColor >> 8) & 0xff) / 255,
    (hexColor & 0xff) / 255,
    alpha ? alpha : 1,
  ]);
};
