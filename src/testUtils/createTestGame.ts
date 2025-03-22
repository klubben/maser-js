import { Game } from "@/game";
import { MockTicker } from "@/testUtils/mockTicker";

export const createTestGame = async (): Promise<{
  game: Game;
  ticker: MockTicker;
}> => {
  return new Promise((resolve) => {
    const ticker = new MockTicker();
    new Game({
      renderer: "headless",
      width: 800,
      height: 600,
      scale: {
        mode: "fit",
        autoCenter: "both",
      },
      ticker,
      autofocus: false,
      onReady: (game) => {
        resolve({ game, ticker });
      },
    });
  });
};
