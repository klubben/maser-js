export type TEventHandler<
  TEvents extends Record<string, object | undefined>,
  K extends string & keyof TEvents,
> = (data?: TEvents[K]) => void;

export class Events<TEvents extends Record<string, object | undefined>> {
  private handlers: {
    [K in keyof TEvents]?: ((data?: TEvents[K]) => void)[];
  } = {};

  private anyHandlers: ((event: never, data: never) => void)[] = [];

  onAny(callback: (event: never, data: never) => void) {
    this.anyHandlers.push(callback);
  }

  offAny(callback: (event: never, data: never) => void) {
    this.anyHandlers = this.anyHandlers.filter((h) => h !== callback);
  }

  on<K extends string & keyof TEvents>(
    event: K,
    callback: TEventHandler<TEvents, K>,
  ): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(callback);
  }

  off<K extends string & keyof TEvents>(
    event: K,
    callback: TEventHandler<TEvents, K>,
  ): void {
    if (!this.handlers[event]) {
      throw new Error(`No handlers for event: ${event}`);
    }
    this.handlers[event] = this.handlers[event]!.filter((h) => h !== callback);
  }

  emit<K extends string & keyof TEvents>(event: K, data?: TEvents[K]): void {
    this.anyHandlers.forEach((handler) =>
      handler(event as never, data as never),
    );
    if (this.handlers[event]) {
      this.handlers[event].forEach((handler) => handler(data));
    }
  }
}
