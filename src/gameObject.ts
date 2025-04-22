import { Alpha } from "@/gameObjectComponents/alpha";
import { BackgroundColor } from "@/gameObjectComponents/backgroundColor";
import {
  BackgroundImage,
  BackgroundImageOptions,
} from "@/gameObjectComponents/backgroundImage";
import { Border } from "@/gameObjectComponents/border";
import { Bounds } from "@/gameObjectComponents/bounds";
import { Crop } from "@/gameObjectComponents/crop";
import { Dimensions } from "@/gameObjectComponents/dimensions";
import { Filter } from "@/gameObjectComponents/filter";
import { GameObjectEvents } from "@/gameObjectComponents/gameObjectEvents";
import { GameObjectInterface } from "@/gameObjectComponents/gameObjectInterface";
import { HtmlText } from "@/gameObjectComponents/htmlText";
import { Mask } from "@/gameObjectComponents/mask";
import { MouseEvents } from "@/gameObjectComponents/mouseEvents";
import { Transform } from "@/gameObjectComponents/transform";
import { IGame } from "@/iGame";
import { clone, uniqueId } from "lodash";
import { Container, Rectangle } from "pixi.js";

export type GameObjectProps = {
  x?: number;
  y?: number;
  scale?: number | { x: number; y: number };
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
  parent?: GameObject | IGame;
  alpha?: number;
  zIndex?: number;
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
  readonly alpha: Alpha;
  readonly filters: Filter;

  constructor(props?: GameObjectProps) {
    const {
      x = 0,
      y = 0,
      scale = 1,
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
      parent,
      alpha = 1,
      zIndex,
    } = props || {};

    this._pixiContainer = new Container();
    this._pixiContainer.label = this._id;

    this.events = new GameObjectEvents();

    this.transform = new Transform({
      pixiContainer: this._pixiContainer,
      x,
      y,
      scale,
      zIndex,
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

    this.alpha = new Alpha({
      container: this._pixiContainer,
      alpha,
    });

    this.filters = new Filter({
      container: this._pixiContainer,
    });

    if (parent) {
      parent.append(this);
    }

    this.events.on("resize", this.update.bind(this));
    this.pixiContainer.on("added", this.update.bind(this));
    this.update();
  }

  private update() {
    this._pixiContainer.filterArea = new Rectangle(
      0,
      0,
      this.dimensions.width,
      this.dimensions.height,
    );
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

  append(children: GameObject[]): void;
  append(child: GameObject): void;
  append(child: GameObject | GameObject[]) {
    if (Array.isArray(child)) {
      child.forEach((c) => this.append(c));
      return;
    }
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
