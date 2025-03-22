export class MockTicker {
  private callbacks: ((delta: number) => void)[] = [];

  onTick(bc: (delta: number) => void) {
    this.callbacks.push(bc);
  }

  tick(delta?: number) {
    this.callbacks.forEach((cb) => cb(delta ?? 20));
  }
}
