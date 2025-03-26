import { BackgroundImage } from "@/components/backgroundImage";
import { labels } from "@/components/labels";
import { Sprite } from "pixi.js";

export class Mask extends BackgroundImage {
  protected _createSprite() {
    this._sprite = new Sprite();
    this._sprite.label = labels.gameObject.backgroundImage.sprite;
    this._container.mask = this._sprite;
    this._container.addChild(this._sprite);
  }
}
