import { GameObject } from "@/gameObject";
import { labels } from "@/gameObjectComponents/labels";
import { describe, expect, it } from "vitest";

describe("BackgroundColor component", () => {
  it("should be able to set background color", () => {
    const go = new GameObject({ backgroundColor: 0xff0000 });
    expect(go.backgroundColor.color).toBe(0xff0000);

    const graphics = go.pixiContainer.children.find(
      (child) =>
        child.label === `${go.id}${labels.gameObject.backgroundColor.graphics}`,
    );

    expect(graphics).toBeDefined();
  });

  it("should be able to set background color to null", () => {
    const go = new GameObject({ backgroundColor: 0xff0000 });
    go.backgroundColor.color = null;
    expect(go.backgroundColor.color).toBeNull();

    const graphics = go.pixiContainer.children.find(
      (child) =>
        child.label === `${go.id}${labels.gameObject.backgroundColor.graphics}`,
    );

    expect(graphics).toBeUndefined();
  });
});
