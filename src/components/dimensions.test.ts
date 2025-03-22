import { describe, expect, it } from "vitest";
import { GameObject } from "@/gameObject";

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
});
