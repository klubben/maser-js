import { GameObject } from "@/gameObject";
import { Application } from "pixi.js";

export class Game {
  private readonly _pixiApp: Application;

  constructor({
    onReady,
    width,
    height,
    background,
    parent,
  }: {
    renderer?: "pixi" | "headless";
    width: number;
    height: number;
    ticker?: {
      onTick: (cb: (delta: number) => void) => void;
    };
    scale?: {
      mode?: "fit";
      autoCenter?: "both" | "horizontally" | "vertically";
    };
    parent?: HTMLElement;
    onReady?: (game: Game) => void;
    autofocus?: boolean;
    background?: number;
  }) {
    this._pixiApp = new Application();
    this._pixiApp
      .init({
        width,
        height,
        antialias: true,
        resolution: 1,
        backgroundColor: background ?? 0x05deff,
      })
      .then(() => {
        if (parent) {
          parent.appendChild(this._pixiApp.canvas);
        }
        if (onReady) {
          onReady(this);
        }
      });
  }

  get pixiApp() {
    return this._pixiApp;
  }

  append(object: GameObject) {
    this._pixiApp.stage.addChild(object.pixiContainer);
  }
}
