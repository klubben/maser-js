import { Dimensions } from "@/gameObjectComponents/dimensions";
import { GameObjectEvents } from "@/gameObjectComponents/gameObjectEvents";
import { labels } from "@/gameObjectComponents/labels";
import {
  Container,
  HTMLText as TextContainer,
  HTMLTextStyleOptions,
} from "pixi.js";

export type HtmlTextStyle = HTMLTextStyleOptions & {
  verticalAlign?: "top" | "middle" | "bottom";
};

export class HtmlText {
  private _container: Container;
  private _dimensions: Dimensions;
  private _text: string = "";
  private _textContainer: TextContainer | null = null;
  private _style: HtmlTextStyle | undefined;
  private _autoWrap: boolean;

  constructor({
    text,
    container,
    dimensions,
    events,
    style,
    autoWrap = true,
  }: {
    text: string | null;
    container: Container;
    dimensions: Dimensions;
    events: GameObjectEvents;
    style?: HtmlTextStyle;
    autoWrap?: boolean;
  }) {
    this._container = container;
    this._dimensions = dimensions;
    this._autoWrap = autoWrap;
    this.text = text;
    this.style = style;
    events.on("resize", this._updateDimensions.bind(this));
  }

  private _getTextContainer() {
    if (!this._textContainer) {
      this._textContainer = new TextContainer();
      this._textContainer.label = `${this._container.label}${labels.gameObject.htmlText.container}`;
      this._container.addChild(this._textContainer);
    }
    return this._textContainer;
  }

  private _updateDimensions() {
    this.style = this._style;
  }

  private _updateVerticalAlign() {
    const textContainer = this._getTextContainer();
    switch (this._style?.verticalAlign) {
      case "middle":
        textContainer.y =
          this._dimensions.height / 2 - textContainer.height / 2;
        break;

      case "bottom":
        textContainer.y = this._dimensions.height - textContainer.height;
        break;

      default:
        textContainer.y = 0;
        break;
    }
  }

  private _horizontalAlign() {
    const textContainer = this._getTextContainer();
    switch (this._style?.align) {
      case "center":
        textContainer.x = this._dimensions.width / 2 - textContainer.width / 2;
        break;

      case "right":
        textContainer.x = this._dimensions.width - textContainer.width;
        break;

      default:
        textContainer.x = 0;
        break;
    }
  }

  get autoWrap() {
    return this._autoWrap;
  }

  set autoWrap(value: boolean) {
    this._autoWrap = value;
    this.style = this._style;
  }

  get style() {
    return this._style;
  }

  set style(value: HtmlTextStyle | undefined) {
    this._style = value;
    if (value !== undefined) {
      const textContainer = this._getTextContainer();
      textContainer.style = value;

      if (this._autoWrap) {
        textContainer.style.wordWrapWidth = this._dimensions.width;
        textContainer.style.wordWrap = true;
      }

      if (value.verticalAlign) {
        this._updateVerticalAlign();
      }

      if (value.align) {
        this._horizontalAlign();
      }
    }
  }

  get text() {
    return this._text;
  }

  set text(value: string | null) {
    this._text = value ?? "";
    if (value !== null) {
      const textContainer = this._getTextContainer();
      textContainer.text = value;
      this._updateDimensions();
    }
  }
}
