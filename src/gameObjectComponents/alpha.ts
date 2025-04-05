import { transition, TransitionOptions } from "@/utils/transition";
import { transitionAsync } from "@/utils/transitionAsync";
import { Container } from "pixi.js";

type AlphaOption = {
  alpha: number;
};

export class Alpha {
  private _alpha = 1;
  private _container: Container;

  constructor({ alpha, container }: { alpha: number; container: Container }) {
    this._container = container;
    this.alpha = alpha;
  }

  set alpha(value: number) {
    this._container.alpha = value;
    this._alpha = value;
  }

  get alpha() {
    return this._alpha;
  }

  setAlpha({ alpha, ...options }: AlphaOption & TransitionOptions): void {
    return transition(this as AlphaOption, { alpha }, options);
  }

  setAlphaAsync({
    alpha,
    ...options
  }: AlphaOption & TransitionOptions): Promise<void> {
    return transitionAsync(this as AlphaOption, { alpha }, options);
  }

  show(options: TransitionOptions = {}) {
    this.setAlpha({ alpha: 1, ...options });
  }

  showAsync(options: TransitionOptions = {}) {
    return this.setAlphaAsync({ alpha: 1, ...options });
  }

  hide(options: TransitionOptions = {}) {
    this.setAlpha({ alpha: 0, ...options });
  }

  hideAsync(options: TransitionOptions = {}) {
    return this.setAlphaAsync({ alpha: 0, ...options });
  }
}
