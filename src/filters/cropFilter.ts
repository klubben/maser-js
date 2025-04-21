import { AbstractFilter } from "@/filters/abstractFilter";
import fragment from "@/filters/crop.frag";
import vertex from "@/filters/default.vert";
import { GlProgram } from "pixi.js";

export class CropFilter extends AbstractFilter {
  protected uniformTypes = {};

  protected _glProgram = new GlProgram({
    fragment,
    vertex,
  });
}
