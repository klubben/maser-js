import { AbstractFilter } from "@/filters/abstractFilter";
import { addFilterToPixiContainer } from "@/utils/addFilterToPixiContainer";
import { Container } from "pixi.js";

export class Filter {
  private _filters: AbstractFilter[] = [];
  private _container: Container;

  constructor({ container }: { container: Container }) {
    this._container = container;
  }

  add(filter: AbstractFilter) {
    this._filters.push(filter);
    addFilterToPixiContainer(this._container, filter);
  }

  remove(filter: AbstractFilter) {
    this._filters = this._filters.filter((f) => f !== filter);
  }
}
