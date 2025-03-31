import { Game } from "@/game";
import { describe, expect, it, vi } from "vitest";

describe("keyboardEvents", () => {
  it("should call a listener", () => {
    const listener = vi.fn();

    const game = new Game({
      renderer: "headless",
      width: 800,
      height: 600,
      background: 0x05deff,
    });
    game.keyboardEvents.on("keydown", listener);

    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "a",
        code: "KeyA",
        bubbles: true,
      }),
    );

    expect(listener).toHaveBeenCalled();
    expect(game.keyboardEvents.isKeyPressed("a")).toBe(true);
    expect(game.keyboardEvents.isKeyPressed("A")).toBe(true);
    expect(game.keyboardEvents.isKeyPressed("b")).toBe(false);

    document.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: "a",
        code: "KeyA",
        bubbles: true,
      }),
    );

    expect(game.keyboardEvents.isKeyPressed("a")).toBe(false);
  });
});
