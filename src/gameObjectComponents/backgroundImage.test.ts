import { GameObject } from "@/gameObject";
import { labels } from "@/gameObjectComponents/labels";
import { describe, expect, it } from "vitest";

describe("BackgroundImage component test", () => {
  it("should be able to set background image", () => {
    const nyancat = "https://i.imgur.com/7dXhnur.png";

    const go = new GameObject({
      backgroundImage: {
        src: nyancat,
      },
    });

    expect(go.backgroundImage.get()).toEqual({
      src: nyancat,
    });
    expect(
      go.pixiContainer.getChildrenByLabel(
        labels.gameObject.backgroundImage.sprite,
      ).length,
    ).toBe(1);
  });
});
