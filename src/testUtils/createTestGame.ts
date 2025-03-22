import { Game } from "@/game";

export const createTestGame = async (): Promise<Game> => {
  return new Promise((resolve) => {
    new Game({
      renderer: "headless",
      width: 800,
      height: 600,
      scale: {
        mode: "fit",
        autoCenter: "both",
      },
      autofocus: false,
      onReady: (game) => {
        resolve(game);
      },
    });
  });
};
