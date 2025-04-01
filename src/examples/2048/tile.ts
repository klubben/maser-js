import { GameObject } from "@/gameObject";

export const tileWidth = 40;
export const tileHeight = 40;
export const tileGap = 4;

export class Tile extends GameObject {
  constructor({ i, j }: { i: number; j: number }) {
    super({
      y: i * tileWidth + i * tileGap,
      x: j * tileHeight + j * tileGap,
      width: tileWidth,
      height: tileHeight,
      htmlText: {
        text: "",
        style: {
          fontSize: 24,
          fill: "#ffffff",
          align: "center",
          verticalAlign: "middle",
          fontFamily: "Arial",
          fontWeight: "bold",
        },
      },
    });
  }

  setColor(color: number) {
    this.backgroundColor.color = color;
  }

  setText(text: string) {
    this.htmlText.text = text;
  }
}
