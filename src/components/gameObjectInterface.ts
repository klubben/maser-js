import { BackgroundColor } from "@/components/backgroundColor";
import { BackgroundImage } from "@/components/backgroundImage";
import { Border } from "@/components/border";
import { Bounds } from "@/components/bounds";
import { Crop } from "@/components/crop";
import { Dimensions } from "@/components/dimensions";
import { GameObjectEvents } from "@/components/gameObjectEvents";
import { HtmlText } from "@/components/htmlText";
import { Mask } from "@/components/mask";
import { Transform } from "@/components/transform";
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
  readonly id: string;
  readonly pixiContainer: Container;

  getChildren(): unknown;

  getParent(): GameObjectInterface | null;

  setParent(parent: GameObjectInterface): void;

  getParents(): GameObjectInterface[];

  append(child: GameObjectInterface): void;

  removeChild(child: GameObjectInterface): void;
}
