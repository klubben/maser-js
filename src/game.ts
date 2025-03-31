import { KeyboardEvents } from "@/gameComponents/keyboardEvents";
import { GameObject } from "@/gameObject";
import { Application } from "pixi.js";

export class Game {
  private readonly _pixiApp: Application | null = null;
  private readonly root: GameObject;
  readonly keyboardEvents: KeyboardEvents;

  constructor({
    onReady,
    width,
    height,
    background,
    parent,
    renderer = "pixi",
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
    this.root = new GameObject({
      x: 0,
      y: 0,
      width,
      height,
      backgroundColor: background,
    });

    this.keyboardEvents = new KeyboardEvents();

    if (renderer === "pixi") {
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
            parent.appendChild(this._pixiApp!.canvas);
          }
          if (onReady) {
            onReady(this);
          }
        });
      this._pixiApp.stage.addChild(this.root.pixiContainer);
    } else {
      if (onReady) {
        onReady(this);
      }
    }
  }

  get pixiApp() {
    return this._pixiApp;
  }

  append(child: GameObject) {
    this.root.append(child);
  }
}
