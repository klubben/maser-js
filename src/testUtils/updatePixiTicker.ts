import { Ticker } from "pixi.js";

export const updatePixiTicker = async (dt = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Ticker.shared.update();
      resolve(true);
    }, dt);
  });
};
