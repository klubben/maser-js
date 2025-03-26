import { Dimensions } from "@/components/dimensions";
import { labels } from "@/components/labels";
import { Assets, Container, Sprite, Texture } from "pixi.js";

type PositionUnits = string;
type PositionPixels = number;

type Position = {
  x: PositionPixels | PositionUnits | "center" | "left" | "right";
  y: PositionPixels | PositionUnits | "center" | "top" | "bottom";
};

type SizeUnits = {
  width: string;
  height: string;
};

type SizePixels = {
  width: number;
  height: number;
};

type Size = "cover" | "contain" | "resizeGameObject" | SizeUnits | SizePixels;

export type BackgroundImageOptions = {
  src: string;
  size?: Size;
  position?: Position;
};

export type BackgroundImageProps = {
  options: BackgroundImageOptions | null;
  container: Container;
  dimensions: Dimensions;
};

export class BackgroundImage {
  protected _container: Container;
  private readonly _dimensions: Dimensions;
  private _options: BackgroundImageOptions | null = null;
  protected _sprite: Sprite | null = null;
  private _texture: Texture | null = null;

  constructor({ options, container, dimensions }: BackgroundImageProps) {
    this._container = container;
    this._dimensions = dimensions;
    this.set(options);
  }

  protected _createSprite() {
    this._sprite = new Sprite();
    this._sprite.zIndex = -1;
    this._sprite.label = labels.gameObject.backgroundImage.sprite;
    this._container.addChildAt(this._sprite, 0);
  }

  private _update() {
    const options = this._options;

    if (options === null) {
      if (this._sprite) {
        this._container.removeChild(this._sprite);
        this._sprite.destroy();
        this._sprite = null;
      }
      return;
    }

    if (!this._sprite) {
      this._createSprite();
    }

    Assets.load(options.src).then((texture: Texture) => {
      const sprite = this._sprite!;
      sprite!.texture = texture;
      this._texture = texture;
      this._setSize();
      this._setPosition();
    });
  }

  private _cover() {
    if (this._sprite && this._texture) {
      this._sprite.scale.set(
        Math.max(
          this._dimensions.width / this._texture.source.width,
          this._dimensions.height / this._texture.source.height,
        ),
      );
    }
  }

  private _contain() {
    if (this._sprite && this._texture) {
      this._sprite.scale.set(
        Math.min(
          this._dimensions.width / this._texture.source.width,
          this._dimensions.height / this._texture.source.height,
        ),
      );
    }
  }

  private _resizeGameObject() {
    if (this._sprite && this._texture) {
      this._dimensions.set(
        this._texture.source.width,
        this._texture.source.height,
      );
    }
  }

  private _setSizeUnits() {
    if (this._sprite && this._texture) {
      const size = this._options?.size as SizeUnits;
      if (size.width.includes("%")) {
        this._sprite.width =
          (this._dimensions.width * parseInt(size.width)) / 100;
        this._sprite.height =
          (this._dimensions.height * parseInt(size.height)) / 100;
      } else {
        this._sprite.width = parseInt(size.width);
        this._sprite.height = parseInt(size.height);
      }
    }
  }

  private _setSize() {
    if (this._options?.size === "cover") {
      this._cover();
    }

    if (this._options?.size === "contain") {
      this._contain();
    }

    if (this._options?.size === "resizeGameObject") {
      this._resizeGameObject();
    }

    if (typeof this._options?.size === "object") {
      this._setSizeUnits();
    }
  }

  private _setEdgePosition(edge: "x" | "y") {
    const dimension = edge === "x" ? "width" : "height";

    if (this._options?.position?.[edge] === "center") {
      this._sprite![edge] =
        (this._dimensions[dimension] - this._sprite![dimension]) / 2;
    }

    if (
      this._options?.position?.[edge] === "left" ||
      this._options?.position?.[edge] === "top"
    ) {
      this._sprite![edge] = 0;
    }

    if (
      this._options?.position?.[edge] === "right" ||
      this._options?.position?.[edge] === "bottom"
    ) {
      this._sprite![edge] =
        this._dimensions[dimension] - this._sprite![dimension];
    }
  }

  private _setPositionUnits(edge: "x" | "y") {
    if (this._sprite && this._texture) {
      const position = this._options?.position![edge] as
        | PositionUnits
        | PositionPixels;
      const dimension = edge === "x" ? "width" : "height";

      if (String(position).includes("%")) {
        this._sprite[edge] =
          (this._dimensions[dimension] * parseInt(String(position))) / 100;
      } else {
        this._sprite[edge] = parseInt(String(position));
      }
    }
  }

  private _setPosition() {
    if (
      ["left", "right", "center"].includes(this._options?.position?.x as string)
    ) {
      this._setEdgePosition("x");
    } else {
      this._setPositionUnits("x");
    }

    if (
      ["top", "bottom", "center"].includes(this._options?.position?.y as string)
    ) {
      this._setEdgePosition("y");
    } else {
      this._setPositionUnits("y");
    }
  }

  set(options: BackgroundImageOptions | null) {
    this._options = options;
    this._update();
  }

  get() {
    return this._options;
  }
}
