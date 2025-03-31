import { BackgroundColor } from "@/gameObjectComponents/backgroundColor";
import {
  BackgroundImage,
  BackgroundImageOptions,
} from "@/gameObjectComponents/backgroundImage";
import { Border } from "@/gameObjectComponents/border";
import { Bounds } from "@/gameObjectComponents/bounds";
import { Crop } from "@/gameObjectComponents/crop";
import { Dimensions } from "@/gameObjectComponents/dimensions";
import { GameObjectEvents } from "@/gameObjectComponents/gameObjectEvents";
import { GameObjectInterface } from "@/gameObjectComponents/gameObjectInterface";
import { HtmlText } from "@/gameObjectComponents/htmlText";
import { Mask } from "@/gameObjectComponents/mask";
import { MouseEvents } from "@/gameObjectComponents/mouseEvents";
import { Transform } from "@/gameObjectComponents/transform";
import { clone, uniqueId } from "lodash";
import { Container } from "pixi.js";

type GameObjectProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  border?: {
    color: number;
    width: number;
  };
  backgroundColor?: number;
  backgroundImage?: BackgroundImageOptions;
  mask?: BackgroundImageOptions;
  isCropped?: boolean;
  htmlText?: {
    text: string | null;
    style?: ConstructorParameters<typeof HtmlText>[0]["style"];
    autoWrap?: boolean;
  };
};

export class GameObject implements GameObjectInterface {
  private readonly _pixiContainer: Container;
  private _children: GameObject[] = [];
  private _parent: GameObject | null = null;
  private _id = uniqueId("game-object-");

  readonly events: GameObjectEvents;
  readonly transform: Transform;
  readonly dimensions: Dimensions;
  readonly border: Border;
  readonly backgroundColor: BackgroundColor;
  readonly backgroundImage: BackgroundImage;
  readonly mask: Mask;
  readonly crop: Crop;
  readonly bounds: Bounds;
  readonly htmlText: HtmlText;
  readonly mouseEvents: MouseEvents;

  constructor(props?: GameObjectProps) {
    const {
      x = 0,
      y = 0,
      width = 0,
      height = 0,
      border = {
        color: 0,
        width: 0,
      },
      backgroundColor = null,
      backgroundImage = null,
      mask = null,
      isCropped = false,
      htmlText = {
        text: null,
      },
    } = props || {};

    this._pixiContainer = new Container();
    this._pixiContainer.label = this._id;

    this.events = new GameObjectEvents();

    this.transform = new Transform({
      pixiContainer: this._pixiContainer,
      x,
      y,
    });

    this.dimensions = new Dimensions({
      events: this.events,
      width,
      height,
    });

    this.border = new Border({
      events: this.events,
      container: this._pixiContainer,
      dimensions: this.dimensions,
      color: border.color,
      width: border.width,
    });

    this.backgroundColor = new BackgroundColor({
      container: this._pixiContainer,
      dimensions: this.dimensions,
      color: backgroundColor,
    });

    this.backgroundImage = new BackgroundImage({
      container: this._pixiContainer,
      dimensions: this.dimensions,
      options: backgroundImage,
    });

    this.mask = new Mask({
      container: this._pixiContainer,
      dimensions: this.dimensions,
      options: mask,
    });

    this.crop = new Crop({
      isActive: isCropped,
      dimensions: this.dimensions,
      events: this.events,
      container: this._pixiContainer,
    });

    this.bounds = new Bounds({
      dimensions: this.dimensions,
      transform: this.transform,
      container: this._pixiContainer,
    });

    this.htmlText = new HtmlText({
      container: this._pixiContainer,
      dimensions: this.dimensions,
      events: this.events,
      text: htmlText.text,
      style: htmlText.style,
      autoWrap: htmlText.autoWrap,
    });

    this.mouseEvents = new MouseEvents({
      container: this._pixiContainer,
      events: this.events,
      dimensions: this.dimensions,
      gameObject: this,
    });
  }

  get id() {
    return this._id;
  }

  getChildren() {
    return clone(this._children);
  }

  getParent() {
    return this._parent;
  }

  setParent(parent: GameObject) {
    this._parent?.removeChild(this);
    this._parent = parent;
  }

  getParents() {
    const parents: GameObject[] = [];
    let currentParent = this._parent;

    while (currentParent) {
      parents.push(currentParent);
      currentParent = currentParent.getParent();
    }

    return parents;
  }

  append(child: GameObject) {
    child.setParent(this);
    this._children.push(child);
    this._pixiContainer.addChild(child._pixiContainer);
    this.events.emit("appendToParent");
  }

  removeChild(child: GameObject) {
    this._children = this._children.filter((c) => c.id !== child.id);
    this._pixiContainer.removeChild(child._pixiContainer);
  }

  get pixiContainer() {
    return this._pixiContainer;
  }
}
