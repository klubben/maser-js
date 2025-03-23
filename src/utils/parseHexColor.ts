export const parseHexColor = (hex: string): number =>
  Number(hex.replace("#", "0x"));
