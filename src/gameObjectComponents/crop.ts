import { CropFilter } from "@/filters/cropFilter";
import { Dimensions } from "@/gameObjectComponents/dimensions";
import { GameObjectEvents } from "@/gameObjectComponents/gameObjectEvents";
import { Container, Filter, Rectangle } from "pixi.js";

export class Crop {
  private _isActive;
  private _dimensions;
  private _filter: CropFilter | null = null;
  private _container: Container;

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

        let existingFilters: Filter[] = [];

        if (
          typeof this._container.filters === "object" &&
          Array.isArray(this._container.filters)
        ) {
          existingFilters = this._container.filters as Filter[];
        } else if (this._container.filters instanceof Filter) {
          existingFilters = [this._container.filters];
        }

        this._container.filters = [
          ...existingFilters,
          this._filter.getFilter(),
        ];
        this._filter.enable();
      }

      const bounds = this._container.getLocalBounds();
      const objectX = 0;
      const objectY = 0;
      const objectW = this._dimensions.width;
      const objectH = this._dimensions.height;

      this._container.filterArea = new Rectangle(
        0,
        0,
        this._dimensions.width,
        this._dimensions.height,
      );

      this._filter.update({
        x: (objectX - bounds.minX) / (bounds.maxX - bounds.minX),
        y: (objectY - bounds.minY) / (bounds.maxY - bounds.minY),
        w: objectW / (bounds.maxX - bounds.minX),
        h: objectH / (bounds.maxY - bounds.minY),
      });
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
