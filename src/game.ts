import { KeyboardEvents } from "@/gameComponents/keyboardEvents";
import { GameObject } from "@/gameObject";
import { IGame } from "@/iGame";
import { Application } from "pixi.js";

export class Game implements IGame {
  private readonly _pixiApp: Application | null = null;
  private readonly _root: GameObject;
  readonly keyboardEvents: KeyboardEvents;

  constructor({
    onReady,
    width,
    height,
    background,
    parent,
    renderer = "pixi",
    resizeTo,
  }: {
    renderer?: "pixi" | "headless";
    width: number;
    height: number;
    ticker?: {
      onTick: (cb: (delta: number) => void) => void;
    };
    parent?: HTMLElement;
    onReady?: (game: Game) => void;
    autofocus?: boolean;
    background?: number;
    resizeTo?: HTMLElement | Window;
  }) {
    this._root = new GameObject({
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
          resizeTo,
        })
        .then(() => {
          if (parent) {
            parent.appendChild(this._pixiApp!.canvas);
          }
          if (onReady) {
            onReady(this);
          }
        });
      this._pixiApp.stage.addChild(this._root.pixiContainer);
    } else {
      if (onReady) {
        onReady(this);
      }
    }
  }

  get pixiApp() {
    return this._pixiApp;
  }

  private _append(child: GameObject) {
    this._root.append(child);
  }

  append(child: GameObject | GameObject[]) {
    if (Array.isArray(child)) {
      child.forEach((c) => this._append(c));
    } else {
      this._append(child);
    }
  }
}
