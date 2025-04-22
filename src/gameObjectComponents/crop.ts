import { CropFilter } from "@/filters/cropFilter";
import { Dimensions } from "@/gameObjectComponents/dimensions";
import { GameObjectEvents } from "@/gameObjectComponents/gameObjectEvents";
import { addFilterToPixiContainer } from "@/utils/addFilterToPixiContainer";
import { Container } from "pixi.js";

export class Crop {
  private _isActive;
  private _dimensions;
  private _filter: CropFilter | null = null;
  private readonly _container: Container;

  constructor({
    isActive = false,
    dimensions,
    events,
    container,
  }: {
    isActive?: boolean;
    dimensions: Dimensions;
    events: GameObjectEvents;
    container: Container;
  }) {
    this._isActive = isActive;
    this._dimensions = dimensions;
    this._container = container;
    this.update();

    events.on("resize", () => this.update());
    this._container.on("added", () => this.update());
  }

  update() {
    if (this._isActive) {
      if (!this._filter) {
        this._filter = new CropFilter();
        addFilterToPixiContainer(this._container, this._filter);
        this._filter.enable();
      }
    } else {
      if (this._filter) {
        this._filter.disable();
      }
    }
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(value) {
    this._isActive = value;
    this.update();
  }
}
