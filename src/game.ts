import { GameObject } from "@/gameObject";
import { Application } from "pixi.js";

export class Game {
  private readonly _pixiApp: Application;
  private readonly root: GameObject;

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
        resolution: window.devicePixelRatio,
        backgroundColor: background ?? 0x05deff,
        autoDensity: true,
      })
      .then(() => {
        if (parent) {
          parent.appendChild(this._pixiApp.canvas);
        }
        if (onReady) {
          onReady(this);
        }
      });

    this.root = new GameObject({
      x: 0,
      y: 0,
      width,
      height,
      backgroundColor: background,
    });
    this._pixiApp.stage.addChild(this.root.pixiContainer);
  }

  get pixiApp() {
    return this._pixiApp;
  }

  append(child: GameObject) {
    this.root.append(child);
  }
}
