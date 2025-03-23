import { Dimensions } from "@/components/dimensions";
import { labels } from "@/components/labels";
import { Assets, Container, Sprite } from "pixi.js";

type SizePosition = {
  position?: {
    x: number;
    y: number;
  };
};

type SizePercentage = {
  size?: "percentage";
  vertical?: number;
  horizontal?: number;
} & SizePosition;

type SizeFit = {
  size?: "cover" | "contain" | "resizeGameObject";
};

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
    if (this._options === null) {
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

    Assets.load(this._options.src).then((texture) => {
      this._sprite!.texture = texture;
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
