import { GameObject } from "@/gameObject";
import { Application } from "pixi.js";

export interface IGame {
  readonly pixiApp: Application | null;

  append(child: GameObject): void;
}
