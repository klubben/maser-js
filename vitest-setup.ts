import { afterAll, beforeAll } from "vitest";
import "vitest-canvas-mock";

const originalImage = global.Image;

beforeAll(() => {
  global.Image = class {
    onload: () => void = () => {};
    set src(_src: string) {
      this.onload();
    }
  } as never;
});

afterAll(() => {
  global.Image = originalImage;
});
