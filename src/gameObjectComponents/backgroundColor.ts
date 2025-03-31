import { Dimensions } from "@/gameObjectComponents/dimensions";
import { labels } from "@/gameObjectComponents/labels";
import { Container, Graphics } from "pixi.js";

export class BackgroundColor {
  private _container: Container;
  private _dimensions: Dimensions;
  private _graphics: Graphics | null = null;
  private _color: number | null = null;

  constructor({
    container,
    dimensions,
    color,
  }: {
    container: Container;
    dimensions: Dimensions;
    color: number | null;
  }) {
    this._container = container;
    this._dimensions = dimensions;
    this.color = color;
  }

  private _updateGraphics() {
    if (this.color === null) {
      if (this._graphics) {
        this._graphics.destroy();
        this._graphics = null;
      }
      return;
    }

    if (!this._graphics) {
      this._graphics = new Graphics();
      this._graphics.zIndex = -2;
      this._graphics.label = `${this._container.label}${labels.gameObject.backgroundColor.graphics}`;
      this._container.addChild(this._graphics);
    }

    this._graphics
      .clear()
      .rect(0, 0, this._dimensions.width, this._dimensions.height)
      .fill({
        color: this.color,
      });
  }

  set color(value: number | null) {
    this._color = value;
    this._updateGraphics();
  }

  get color() {
    return this._color;
  }
}
