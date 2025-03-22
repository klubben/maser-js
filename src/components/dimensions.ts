export class Dimensions {
  private _width: number;
  private _height: number;

  constructor({ width, height }: { width: number; height: number }) {
    this._width = width;
    this._height = height;
  }

  set width(value: number) {
    this._width = value;
  }

  get width() {
    return this._width;
  }

  set height(value: number) {
    this._height = value;
  }

  get height() {
    return this._height;
  }
}
