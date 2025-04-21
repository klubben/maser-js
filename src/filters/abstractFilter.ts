import {
  Filter,
  FilterWithShader,
  GlProgram,
  UNIFORM_TYPES_SINGLE,
} from "pixi.js";

type GLSLTypeMap = {
  f32: number;
  i32: number;
  "vec2<f32>": Float32Array;
  "vec3<f32>": Float32Array;
  "vec4<f32>": Float32Array;
  "mat2x2<f32>": Float32Array;
  "mat3x3<f32>": Float32Array;
  "mat4x4<f32>": Float32Array;
  "mat3x2<f32>": Float32Array;
  "mat4x2<f32>": Float32Array;
  "mat2x3<f32>": Float32Array;
  "mat4x3<f32>": Float32Array;
  "mat2x4<f32>": Float32Array;
  "mat3x4<f32>": Float32Array;
  "vec2<i32>": Int32Array;
  "vec3<i32>": Int32Array;
  "vec4<i32>": Int32Array;
};

// Utility type to map GLSL types to TypeScript types
type MapUniforms<Uniforms extends Record<string, UNIFORM_TYPES_SINGLE>> = {
  [K in keyof Uniforms]: Uniforms[K] extends keyof GLSLTypeMap
    ? GLSLTypeMap[Uniforms[K]]
    : never;
};

export abstract class AbstractFilter<
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Uniforms extends Record<string, UNIFORM_TYPES_SINGLE> = {},
> {
  protected abstract uniformTypes: Uniforms;
  protected abstract _glProgram: GlProgram;
  protected _filter: Filter | null = null;
  private readonly _uniforms: MapUniforms<Uniforms> | undefined;

  constructor(
    uniforms?: keyof Uniforms extends never ? undefined : MapUniforms<Uniforms>,
  ) {
    this._uniforms = uniforms;
  }

  private _createFilter() {
    const options: FilterWithShader = { glProgram: this._glProgram };

    if (this._uniforms) {
      const uniforms = Object.fromEntries(
        Object.entries(this._uniforms).map(([name, value]) => {
          return [name, { value, type: this.uniformTypes[name] }];
        }),
      );

      options.resources = {
        uniforms,
      };
    }

    return new Filter(options);
  }

  enable() {
    this.getFilter().enabled = true;
  }

  disable() {
    this.getFilter().enabled = false;
  }

  update(uniforms: MapUniforms<Uniforms>) {
    Object.entries(uniforms).forEach(([key, value]) => {
      if (this.getFilter().resources.uniforms[key]) {
        this.getFilter().resources.uniforms[key].value = value;
      }
    });
  }

  getFilter(): Filter {
    if (!this._filter) {
      this._filter = this._createFilter();
    }

    return this._filter;
  }
}
