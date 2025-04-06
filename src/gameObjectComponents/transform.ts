import { transition, TransitionOptions } from "@/utils/transition";
import { transitionAsync } from "@/utils/transitionAsync";
import { Container } from "pixi.js";

type Position = {
  x: number;
  y: number;
};

export class Transform {
  private _pixiContainer: Container;

  constructor({
    x,
    y,
    pixiContainer,
    scale,
    zIndex,
  }: {
    x: number;
    y: number;
    pixiContainer: Container;
    scale: number | { x: number; y: number };
    zIndex?: number;
  }) {
    this._pixiContainer = pixiContainer;
    this.x = x;
    this.y = y;

    if (zIndex !== undefined) {
      this.zIndex = zIndex;
    }

    if (typeof scale === "number") {
      this.scale = scale;
    } else {
      this.scaleX = scale.x;
      this.scaleY = scale.y;
    }
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

  set scale(value: number) {
    this._pixiContainer.scale.set(value, value);
  }

  get scale() {
    return this._pixiContainer.scale.x;
  }

  set scaleX(value: number) {
    this._pixiContainer.scale.x = value;
  }

  set scaleY(value: number) {
    this._pixiContainer.scale.y = value;
  }

  get scaleX() {
    return this._pixiContainer.scale.x;
  }

  get scaleY() {
    return this._pixiContainer.scale.y;
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

  setPosition({ x, y, ...options }: Position & TransitionOptions): void {
    return transition(this as Position, { x, y }, options);
  }

  setPositionAsync({
    x,
    y,
    ...options
  }: Position & TransitionOptions): Promise<void> {
    return transitionAsync(this as Position, { x, y }, options);
  }

  set zIndex(zIndex: number) {
    this._pixiContainer.zIndex = zIndex;
  }

  get zIndex() {
    return this._pixiContainer.zIndex;
  }
}
