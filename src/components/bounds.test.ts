import { GameObject } from "@/gameObject";
import { Bounds } from "@/type/bounds";
import { describe, expect, it } from "vitest";

describe("GameObject bounds component", () => {
  it("should return local bounds", () => {
    const go = new GameObject({ width: 10, height: 20 });
    expect(go.bounds.local()).toEqual({
      x: 0,
      y: 0,
      width: 10,
      height: 20,
    });
  });

  it("should update passed local bounds", () => {
    const go = new GameObject({ width: 10, height: 20 });
    const bounds = new Bounds();

    go.bounds.local(bounds);
    expect(bounds).toEqual({
      x: 0,
      y: 0,
      width: 10,
      height: 20,
    });
  });

  it("should return global bounds", () => {
    const go = new GameObject({ width: 10, height: 20 });
    const parent = new GameObject({ x: 100, y: 200 });

    parent.append(go);
    expect(go.bounds.global()).toEqual({
      x: 100,
      y: 200,
      width: 10,
      height: 20,
    });
  });

  it("should update passed global bounds", () => {
    const go = new GameObject({ width: 10, height: 20 });
    const parent = new GameObject({ x: 100, y: 200 });
    const bounds = new Bounds();

    parent.append(go);
    go.bounds.global(bounds);
    expect(bounds).toEqual({
      x: 100,
      y: 200,
      width: 10,
      height: 20,
    });
  });
});
