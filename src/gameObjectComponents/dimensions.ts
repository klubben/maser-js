import { GameObjectEvents } from "@/gameObjectComponents/gameObjectEvents";

export class Dimensions {
  private _width: number;
  private _height: number;
  private _events: GameObjectEvents;

  constructor({
    width,
    height,
    events,
  }: {
    width: number;
    height: number;
    events: GameObjectEvents;
  }) {
    this._events = events;
    this._width = width;
    this._height = height;
  }

  set(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._events.emit("resize");
  }

  set width(value: number) {
    this._width = value;
    this._events.emit("resize");
  }

  get width() {
    return this._width;
  }

  set height(value: number) {
    this._events.emit("resize");
    this._height = value;
  }

  get height() {
    return this._height;
  }
}
