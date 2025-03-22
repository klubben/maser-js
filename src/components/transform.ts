export class Transform {
  private _x: number;
  private _y: number;

  constructor({ x, y }: { x: number; y: number }) {
    this._x = x;
    this._y = y;
  }

  getGlobalPosition() {
    return { x: this.x, y: this.y };
  }

  setGlobalPosition({ x, y }: { x: number; y: number }) {
    const bounds = this.getGlobalPosition();
    const offset = {
      x: bounds.x - this.x,
      y: bounds.y - this.y,
    };

    this.x = x - offset.x;
    this.y = y - offset.y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(value: number) {
    this._x = value;
  }

  set y(value: number) {
    this._y = value;
  }
}
