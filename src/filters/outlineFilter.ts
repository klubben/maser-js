import { AbstractFilter } from "@/filters/abstractFilter";
import vertex from "@/filters/default.vert";
import fragment from "@/filters/outline.frag";
import { GlProgram } from "pixi.js";

export class OutlineFilter extends AbstractFilter<{
  thickness: "f32";
  color: "vec3<f32>";
}> {
  protected uniformTypes = {
    thickness: "f32" as const,
    color: "vec3<f32>" as const,
  };

  protected _glProgram = new GlProgram({
    fragment,
    vertex,
  });
}
