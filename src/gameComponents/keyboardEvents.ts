export type KeyboardListener = (event: KeyboardEvent) => void;
export type KeyboardEventType = "keydown" | "keyup";

export class KeyboardEvents {
  private _keyStates: { [key: string]: boolean } = {};
  private _listeners: Record<KeyboardEventType, KeyboardListener[]> = {
    keydown: [] as KeyboardListener[],
    keyup: [] as KeyboardListener[],
  };

  constructor() {
    document.addEventListener("keydown", this._onKeyDown.bind(this));
    document.addEventListener("keyup", this._onKeyUp.bind(this));
  }

  private _onKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    if (!this._keyStates[key]) {
      this._keyStates[key] = true;
    }

    this._listeners.keydown.forEach((listener) => {
      listener(event);
    });
  }

  private _onKeyUp(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    this._keyStates[key] = false;
    this._listeners.keyup.forEach((listener) => {
      listener(event);
    });
  }

  on(type: KeyboardEventType, listener: KeyboardListener) {
    this._listeners[type].push(listener);
  }

  off(type: KeyboardEventType, listener: KeyboardListener) {
    this._listeners[type] = this._listeners[type].filter((l) => l !== listener);
  }

  isKeyPressed(key: string): boolean {
    return this._keyStates[key.toLowerCase()] || false;
  }
}
