import { Container } from "pixi.js";

export class Transform {
  private _pixiContainer: Container;

  constructor({
    x,
    y,
    pixiContainer,
  }: {
    x: number;
    y: number;
    pixiContainer: Container;
  }) {
    this._pixiContainer = pixiContainer;
    this.x = x;
    this.y = y;
  }

  getGlobalPosition() {
    const position = this._pixiContainer.getGlobalPosition();
    return { x: position.x, y: position.y };
  }

  setGlobalPosition({ x, y }: { x: number; y: number }) {
    const position = this.getGlobalPosition();
    const offset = {
      x: position.x - this.x,
      y: position.y - this.y,
    };

    this.x = x - offset.x;
    this.y = y - offset.y;
  }

  get x() {
    return this._pixiContainer.x;
  }

  get y() {
    return this._pixiContainer.y;
  }

  set x(value: number) {
    this._pixiContainer.x = value;
  }

  set y(value: number) {
    this._pixiContainer.y = value;
  }
}
