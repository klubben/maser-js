import { Dimensions } from "@/gameObjectComponents/dimensions";
import { Transform } from "@/gameObjectComponents/transform";
import { Bounds as BoundsType } from "@/type/bounds";
import { Container, Point } from "pixi.js";

export class Bounds {
  private _dimensions;
  private _transform;
  private _container;

  constructor(props: {
    dimensions: Dimensions;
    transform: Transform;
    container: Container;
  }) {
    this._dimensions = props.dimensions;
    this._transform = props.transform;
    this._container = props.container;
  }

  local(bounds: BoundsType): void;
  local(): BoundsType;
  local(bounds?: BoundsType) {
    if (bounds) {
      bounds.x = this._transform.x;
      bounds.y = this._transform.y;
      bounds.width = this._dimensions.width;
      bounds.height = this._dimensions.height;
    } else {
      return {
        x: this._transform.x,
        y: this._transform.y,
        width: this._dimensions.width,
        height: this._dimensions.height,
      };
    }
  }

  global(bounds: BoundsType): void;
  global(): BoundsType;
  global(bounds?: BoundsType) {
    if (bounds) {
      this._container.getGlobalPosition(bounds as unknown as Point);
      bounds.width = this._dimensions.width;
      bounds.height = this._dimensions.height;
    } else {
      const { x, y } = this._container.getGlobalPosition();
      return {
        x,
        y,
        width: this._dimensions.width,
        height: this._dimensions.height,
      };
    }
  }
}
