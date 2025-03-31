import { GameObject } from "@/gameObject";
import { labels } from "@/gameObjectComponents/labels";
import { describe, expect, it } from "vitest";

describe("Border component", () => {
  it("should be able to set border", () => {
    const go = new GameObject({ border: { width: 10, color: 0xff0000 } });
    expect(go.border.width).toBe(10);
    expect(go.border.color).toBe(0xff0000);

    const graphics = go.pixiContainer.children.find(
      (child) => child.label === `${go.id}${labels.gameObject.border.graphics}`,
    );

    expect(graphics).toBeDefined();
  });

  it("should be able to set border width", () => {
    const go = new GameObject({ border: { width: 10, color: 0xff0000 } });
    go.border.width = 20;
    go.border.color = 0x00ff00;
    expect(go.border.width).toBe(20);
    expect(go.border.color).toBe(0x00ff00);
  });

  it("should be able to set border width to 0", () => {
    const go = new GameObject({ border: { width: 10, color: 0xff0000 } });
    go.border.width = 0;
    expect(go.border.width).toBe(0);

    const graphics = go.pixiContainer.children.find(
      (child) => child.label === `${go.id}${labels.gameObject.border.graphics}`,
    );

    expect(graphics).toBeUndefined();
  });
});
