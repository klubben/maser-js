import { Dimensions } from "@/gameObjectComponents/dimensions";
import { GameObjectEvents } from "@/gameObjectComponents/gameObjectEvents";
import { labels } from "@/gameObjectComponents/labels";
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
    events,
  }: {
    width: number;
    color: number;
    container: Container;
    dimensions: Dimensions;
    events: GameObjectEvents;
  }) {
    this._container = container;
    this._dimensions = dimensions;
    this.color = color;
    this.width = width;
    events.on("resize", this._updateGraphics.bind(this));
  }

  private _updateGraphics() {
    if (this.width === 0) {
      if (this._graphics) {
        this._graphics.destroy();
        this._graphics = null;
      }
      return;
    }

    if (!this._graphics) {
      this._graphics = new Graphics();
      this._graphics.label = `${this._container.label}${labels.gameObject.border.graphics}`;
      this._container.addChild(this._graphics);
    }

    this._graphics
      .clear()
      .rect(0, 0, this._dimensions.width, this._dimensions.height)
      .stroke({
        width: this.width,
        color: this.color,
      });
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
