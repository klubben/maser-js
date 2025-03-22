import { beforeAll, describe, expect, it } from "vitest";
import { GameObject } from "@/gameObject";
import { Game } from "@/game";
import { createTestGame } from "@/testUtils/createTestGame";

let game: Game;

beforeAll(async () => {
  game = await createTestGame();
});

describe("GameObject nesting", () => {
  it("should have id", () => {
    const gameObject = new GameObject({ game });
    const gameObject2 = new GameObject({ game });

    expect(gameObject.id).toBe("game-object-1");
    expect(gameObject2.id).toBe("game-object-2");
  });

  it("should be able to append other gameObjectes", () => {
    const gameObject = new GameObject({ game });
    const gameObject2 = new GameObject({ game });

    expect(async () => {
      gameObject.append(gameObject2);
    }).not.toThrow();
  });

  it("should return children", () => {
    const gameObject = new GameObject({ game });
    const gameObject2 = new GameObject({ game });
    gameObject.append(gameObject2);

    expect(gameObject.getChildren()).toHaveLength(1);
    expect(gameObject.getChildren()[0]).toBe(gameObject2);
    expect(gameObject2.getChildren()).toHaveLength(0);
  });

  it("should have parent when attached", () => {
    const gameObject = new GameObject({ game });
    const gameObject2 = new GameObject({ game });
    gameObject.append(gameObject2);

    expect(gameObject2.getParent()).toBe(gameObject);
  });

  it("should change parent when reattached", () => {
    const gameObject = new GameObject({ game });
    const gameObject2 = new GameObject({ game });

    gameObject.append(gameObject2);
    expect(gameObject2.getParent()).toBe(gameObject);

    const gameObject3 = new GameObject({ game });

    gameObject3.append(gameObject2);

    expect(gameObject2.getParent()).toBe(gameObject3);
    expect(gameObject.getChildren()).toHaveLength(0);
  });

  it("should have parents array", () => {
    const gameObject = new GameObject({ game });
    const gameObject2 = new GameObject({ game });
    const gameObject3 = new GameObject({ game });

    gameObject.append(gameObject2);
    gameObject2.append(gameObject3);

    const parents = gameObject3.getParents();

    expect(parents).toHaveLength(2);
    expect(parents[1]).toBe(gameObject);
    expect(parents[0]).toBe(gameObject2);
  });
});
