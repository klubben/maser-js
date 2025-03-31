import { GameObject } from "@/gameObject";
import { labels } from "@/gameObjectComponents/labels";
import { describe, expect, it } from "vitest";

describe("htmlTest", () => {
  it("should set text", () => {
    const go = new GameObject({
      htmlText: { text: "hello" },
    });
    expect(go.htmlText.text).toBe("hello");
  });

  it("should update text", () => {
    const go = new GameObject({
      htmlText: { text: "hello" },
    });
    go.htmlText.text = "world";
    expect(go.htmlText.text).toBe("world");
  });

  it("should create text container", () => {
    const go = new GameObject({
      htmlText: { text: "hello" },
    });

    const textContainer = go.pixiContainer.children.find(
      (child) =>
        child.label ===
        `${go.pixiContainer.label}${labels.gameObject.htmlText.container}`,
    );

    expect(textContainer).toBeDefined();
  });
});
