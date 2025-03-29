import { Game } from "@/game";

export const createTestGame = (): Game => {
  const div = document.createElement("div");
  return new Game({
    renderer: "headless",
    width: 800,
    height: 600,
    parent: div,
    scale: {
      mode: "fit",
      autoCenter: "both",
    },
    autofocus: false,
  });
};
