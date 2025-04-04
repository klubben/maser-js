import { Easing, Tween } from "@tweenjs/tween.js";
import { Container, Ticker } from "pixi.js";

export class Transform {
  private _pixiContainer: Container;

  constructor({
    x,
    y,
    pixiContainer,
    scale,
  }: {
    x: number;
    y: number;
    pixiContainer: Container;
    scale: number | { x: number; y: number };
  }) {
    this._pixiContainer = pixiContainer;
    this.x = x;
    this.y = y;

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

  setPosition({
    x,
    y,
    duration = 0,
    delay,
    onComplete,
    easing = Easing.Linear.None,
  }: {
    x: number;
    y: number;
    duration?: number;
    delay?: number;
    onComplete?: () => void;
    easing?: (t: number) => number;
  }) {
    if (duration === 0) {
      this.x = x;
      this.y = y;
      onComplete?.();
      return;
    }

    const tween = new Tween(this)
      .to({ x, y }, duration)
      .delay(delay)
      .easing(easing)
      .onComplete(() => {
        onComplete?.();
        Ticker.shared.remove(update);
      })
      .start();

    const update = () => {
      tween.update();
    };

    Ticker.shared.add(update);
  }

  async setPositionAsync(
    props: Omit<Parameters<Transform["setPosition"]>[0], "onComplete">,
  ) {
    return new Promise<void>((resolve) => {
      this.setPosition({
        ...props,
        onComplete: () => {
          resolve();
        },
      });
    });
  }
}
