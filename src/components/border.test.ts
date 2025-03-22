import { Game } from "@/game";
import { beforeAll, describe, expect, it } from "vitest";
import { createTestGame } from "@/testUtils/createTestGame";
import { GameObject } from "@/gameObject";

let game: Game;

beforeAll(async () => {
  game = await createTestGame();
});

describe("Border component", () => {
  it("should be able to set border", () => {
    const go = new GameObject({ game, border: { width: 10, color: 0xff0000 } });
    expect(go.border.width).toBe(10);
    expect(go.border.color).toBe(0xff0000);
  });

  it("should be able to set border width", () => {
    const go = new GameObject({ game, border: { width: 10, color: 0xff0000 } });
    go.border.width = 20;
    go.border.color = 0x00ff00;
    expect(go.border.width).toBe(20);
    expect(go.border.color).toBe(0x00ff00);
  });
});
