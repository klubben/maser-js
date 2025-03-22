export class Border {
  private _width: number;
  private _color: number;

  constructor({ width, color }: { width: number; color: number }) {
    this._color = color;
    this._width = width;
  }

  get width() {
    return this._width;
  }

  get color() {
    return this._color;
  }

  set width(value: number) {
    this._width = value;
  }

  set color(value: number) {
    this._color = value;
  }
}
