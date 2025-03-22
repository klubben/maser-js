import { Transform } from "@/components/transform";
import { clone, uniqueId } from "lodash";
import { Game } from "@/game";
import { Dimensions } from "@/components/dimensions";
import { Border } from "@/components/border";

export class GameObject {
  private readonly _game: Game;
  private _children: GameObject[] = [];
  private _parent: GameObject | null = null;
  private _id = uniqueId("game-object-");

  readonly transform: Transform;
  readonly dimensions: Dimensions;
  readonly border: Border;

  constructor({
    game,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    border = {
      color: 0,
      width: 0,
    },
  }: {
    game: Game;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    border?: {
      color: number;
      width: number;
    };
  }) {
    this._game = game;
    this.transform = new Transform({
      x,
      y,
    });

    this.dimensions = new Dimensions({
      width,
      height,
    });

    this.border = new Border({
      color: border.color,
      width: border.width,
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

  private setParent(parent: GameObject) {
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
  }

  private removeChild(child: GameObject) {
    this._children = this._children.filter((c) => c.id !== child.id);
  }
}
