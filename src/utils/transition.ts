import { Easing, Tween } from "@tweenjs/tween.js";
import { Ticker } from "pixi.js";

export type TransitionOptions = {
  duration?: number;
  delay?: number;
  onComplete?: () => void;
  easing?: (t: number) => number;
};

export const transition = <T extends Record<string, number>>(
  target: T,
  to: T,
  options: TransitionOptions,
) => {
  const {
    duration = 0,
    delay,
    onComplete,
    easing = Easing.Linear.None,
  } = options;

  if (duration === 0) {
    Object.assign(target, to);
    onComplete?.();
    return;
  }

  const tween = new Tween(target)
    .to(to, duration)
    .delay(delay)
    .easing(easing)
    .onComplete(() => {
      onComplete?.();
      Ticker.shared.remove(update);
    })
    .start();

  const update = () => {
    tween.update();
  };

  Ticker.shared.add(update);
};
