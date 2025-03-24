import { Dimensions } from "@/components/dimensions";
import { labels } from "@/components/labels";
import { Assets, Container, Sprite } from "pixi.js";

type SizePosition = {
  position?: {
    x: number | "center" | "left" | "right";
    y: number | "center" | "top" | "bottom";
  };
};

type SizePercentage = {
  size?: "percentage";
  vertical?: number;
  horizontal?: number;
} & SizePosition;

type SizeFit = {
  size?: "cover" | "contain" | "resizeGameObject";
} & SizePosition;

type SizeAuto = {
  size?: "auto";
} & SizePosition;

export type BackgroundImageOptions = {
  src: string;
} & (SizePercentage | SizeAuto | SizeFit);

export type BackgroundImageProps = {
  options: BackgroundImageOptions | null;
  container: Container;
  dimensions: Dimensions;
};

export class BackgroundImage {
  private _container: Container;
  private _dimensions: Dimensions;
  private _options: BackgroundImageOptions | null = null;
  private _sprite: Sprite | null = null;

  constructor({ options, container, dimensions }: BackgroundImageProps) {
    this._container = container;
    this._dimensions = dimensions;
    this.set(options);
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
      this._sprite = new Sprite();
      this._sprite.label = labels.gameObject.backgroundImage.sprite;
      this._container.addChildAt(this._sprite, 0);
    }

    Assets.load(options.src).then((texture) => {
      const sprite = this._sprite!;
      sprite!.texture = texture;

      switch (options.size) {
        case "cover":
          sprite.scale.set(
            Math.max(
              this._dimensions.width / texture["baseTexture"].width,
              this._dimensions.height / texture["baseTexture"].height,
            ),
          );
          break;

        case "contain":
          sprite.scale.set(
            Math.min(
              this._dimensions.width / texture["baseTexture"].width,
              this._dimensions.height / texture["baseTexture"].height,
            ),
          );
          break;

        case "percentage":
          sprite.width =
            (this._dimensions.width * (options.horizontal ?? 1)) / 100;
          sprite.height =
            (this._dimensions.height * (options.vertical ?? 1)) / 100;
          break;

        case "resizeGameObject":
          this._dimensions.set(
            texture["baseTexture"].width,
            texture["baseTexture"].height,
          );
          break;
      }

      switch (options.position?.x) {
        case "left":
          sprite.x = 0;
          break;

        case "center":
          sprite.x = (this._dimensions.width - sprite.width) / 2;
          break;

        case "right":
          sprite.x = this._dimensions.width - sprite.width;
          break;

        default:
          if (typeof options.position?.x === "number") {
            sprite.x = options.position?.x;
          }
          break;
      }

      switch (options.position?.y) {
        case "top":
          sprite.y = 0;
          break;

        case "center":
          sprite.y = (this._dimensions.height - sprite.height) / 2;
          break;

        case "bottom":
          sprite.y = this._dimensions.height - sprite.height;
          break;

        default:
          if (typeof options.position?.y === "number") {
            sprite.y = options.position?.y;
          }
          break;
      }
    });
  }

  set(options: BackgroundImageOptions | null) {
    this._options = options;
    this._update();
  }

  get() {
    return this._options;
  }
}
