import { GameObject } from "@/gameObject";
import { describe, expect, it, vi } from "vitest";

describe("GameObject dimensions component", () => {
  it("should return width, height", () => {
    const go = new GameObject({ width: 10, height: 20 });

    expect(go.dimensions.width).toBe(10);
    expect(go.dimensions.height).toBe(20);
  });

  it("should set width, height", () => {
    const go = new GameObject({ width: 10, height: 20 });

    go.dimensions.width = 100;
    go.dimensions.height = 200;

    expect(go.dimensions.width).toBe(100);
    expect(go.dimensions.height).toBe(200);
  });

  it("should have set method for setting width and height at once", () => {
    const go = new GameObject({ width: 10, height: 20 });
    const resizeCallback = vi.fn();

    go.events.on("resize", resizeCallback);

    go.dimensions.set(100, 200);

    expect(go.dimensions.width).toBe(100);
    expect(go.dimensions.height).toBe(200);
    expect(resizeCallback).toBeCalledTimes(1);
  });

  it("should emit 'resize' event when width, height are set", () => {
    const go = new GameObject({ width: 10, height: 20 });
    const resizeCallback = vi.fn();

    go.events.on("resize", resizeCallback);

    go.dimensions.width = 100;
    go.dimensions.height = 200;

    expect(resizeCallback).toBeCalledTimes(2);
  });
});
