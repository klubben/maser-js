export class Game {
  constructor({
    onReady,
  }: {
    renderer: "pixi" | "headless";
    width: number;
    height: number;
    scale?: {
      mode?: "fit";
      autoCenter?: "both" | "horizontally" | "vertically";
    };
    parent?: HTMLElement;
    onReady?: (game: Game) => void;
    autofocus?: boolean;
  }) {
    if (onReady) {
        onReady(this);
    }
  }

  destroy() {

  }
}
