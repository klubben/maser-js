import { Game } from "@/game";

export const createStorybookGame = (onReady?: (game: Game) => void) => {
  const div = document.createElement("div");
  div.style.width = "640px";
  div.style.height = "480px";

  new Game({
    width: 640,
    height: 480,
    parent: div,
    onReady,
    resizeTo: window,
  });

  return div;
};
