import { BackgroundColor } from "@/gameObjectComponents/backgroundColor";
import { BackgroundImage } from "@/gameObjectComponents/backgroundImage";
import { Border } from "@/gameObjectComponents/border";
import { Bounds } from "@/gameObjectComponents/bounds";
import { Crop } from "@/gameObjectComponents/crop";
import { Dimensions } from "@/gameObjectComponents/dimensions";
import { GameObjectEvents } from "@/gameObjectComponents/gameObjectEvents";
import { HtmlText } from "@/gameObjectComponents/htmlText";
import { Mask } from "@/gameObjectComponents/mask";
import { MouseEvents } from "@/gameObjectComponents/mouseEvents";
import { Transform } from "@/gameObjectComponents/transform";
import { Container } from "pixi.js";

export interface GameObjectInterface {
  events: GameObjectEvents;
  transform: Transform;
  dimensions: Dimensions;
  border: Border;
  backgroundColor: BackgroundColor;
  backgroundImage: BackgroundImage;
  mask: Mask;
  crop: Crop;
  bounds: Bounds;
  htmlText: HtmlText;
  mouseEvents: MouseEvents;
  readonly id: string;
  readonly pixiContainer: Container;

  getChildren(): unknown;

  getParent(): GameObjectInterface | null;

  setParent(parent: GameObjectInterface): void;

  getParents(): GameObjectInterface[];

  append(child: GameObjectInterface): void;

  removeChild(child: GameObjectInterface): void;
}
