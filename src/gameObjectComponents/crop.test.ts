import { GameObject } from "@/gameObject";
import { Filter } from "pixi.js";
import { describe, expect, it } from "vitest";

describe("Crop component", () => {
  it("should set isCropped", () => {
    const go = new GameObject({ isCropped: true });

    expect(go.crop.isActive).toBe(true);
  });

  it("should set isActive to false by default", () => {
    const go = new GameObject();

    expect(go.crop.isActive).toBe(false);
  });

  it("should set isActive to true", () => {
    const go = new GameObject();

    go.crop.isActive = true;

    expect(go.crop.isActive).toBe(true);
  });

  it("should set isActive to false", () => {
    const go = new GameObject({ isCropped: true });

    go.crop.isActive = false;

    expect(go.crop.isActive).toBe(false);
  });

  it("should add crop filter to container", () => {
    const go = new GameObject({ isCropped: true });

    const cropFilter = (go.pixiContainer.filters as Filter[]).find((filter) => {
      return filter.glProgram.fragment?.includes("crop.frag");
    });

    expect(cropFilter).toBeDefined();
  });
});
