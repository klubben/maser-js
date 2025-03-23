import { afterAll, beforeAll, vi } from "vitest";
import "vitest-canvas-mock";

const originalImage = global.Image;

beforeAll(() => {
  global.Image = class {
    onload: () => void = () => {};

    set src(_src: string) {
      this.onload();
    }
  } as never;
  global.URL.createObjectURL = vi.fn(() => "details");
  if (typeof Worker === "undefined") {
    global.Worker = class {
      addEventListener() {}

      removeEventListener() {}

      dispatchEvent() {
        return false;
      }

      onmessage() {}

      onmessageerror() {}

      onerror() {}

      postMessage() {}

      terminate() {}
    };
  }
});

afterAll(() => {
  global.Image = originalImage;
});
