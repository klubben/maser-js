import { Dimensions } from "@/components/dimensions";
import { Container, Graphics } from "pixi.js";

export class Border {
  private _width = 0;
  private _color = 0;
  private _graphics: Graphics | null = null;
  private _container: Container;
  private _dimensions: Dimensions;

  constructor({
    width,
    color,
    container,
    dimensions,
  }: {
    width: number;
    color: number;
    container: Container;
    dimensions: Dimensions;
  }) {
    this._container = container;
    this._dimensions = dimensions;
    this.color = color;
    this.width = width;
  }

  private _updateGraphics() {
    if (this.width === 0) {
      if (this._graphics) {
        this._graphics.destroy();
        this._graphics = null;
      }
      return;
    } else {
      this._graphics = new Graphics();
      this._container.addChild(this._graphics);
    }

    this._graphics
      .clear()
      .setStrokeStyle({
        width: this.width,
        color: this.color,
      })
      .rect(0, 0, this._dimensions.width, this._dimensions.height)
      .stroke();
  }

  get width() {
    return this._width;
  }

  get color() {
    return this._color;
  }

  set width(value: number) {
    this._width = value;
    this._updateGraphics();
  }

  set color(value: number) {
    this._color = value;
    this._updateGraphics();
  }
}
