import fragment from "@/filters/crop.frag";
import vertex from "@/filters/default.vert";
import { Filter, GlProgram } from "pixi.js";

export class CropFilter {
  private readonly _filter;

  constructor() {
    this._filter = new Filter({
      glProgram: new GlProgram({
        fragment,
        vertex,
      }),
      resources: {
        dimensions: {
          ux: { value: 0.0, type: "f32" },
          uy: { value: 0.0, type: "f32" },
          uw: { value: 0.0, type: "f32" },
          uh: { value: 0.0, type: "f32" },
        },
      },
    });
  }

  enable() {
    this._filter.enabled = true;
  }

  disable() {
    this._filter.enabled = false;
  }

  update({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
    this._filter.resources.dimensions.uniforms.ux = x;
    this._filter.resources.dimensions.uniforms.uy = y;
    this._filter.resources.dimensions.uniforms.uw = w;
    this._filter.resources.dimensions.uniforms.uh = h;
  }

  getFilter() {
    return this._filter;
  }
}
