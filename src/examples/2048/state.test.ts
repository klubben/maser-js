import { State } from "@/examples/2048/state";
import { cloneDeep } from "lodash";
import { describe, expect, it } from "vitest";

const initialGrid = [
  [2, 0, 2, 0],
  [2, 2, 0, 0],
  [0, 0, 2, 2],
  [0, 0, 0, 0],
];

describe("game2048", () => {
  it("should move up", () => {
    const game = new State(cloneDeep(initialGrid));
    game.move("up", true);
    expect(game.grid).toEqual([
      [4, 2, 4, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(game.score).toBe(8);
  });

  it("should move down", () => {
    const game = new State(cloneDeep(initialGrid));
    game.move("down", true);
    expect(game.grid).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 2, 4, 2],
    ]);
    expect(game.score).toBe(8);
  });

  it("should move left", () => {
    const game = new State(cloneDeep(initialGrid));
    game.move("left", true);
    expect(game.grid).toEqual([
      [4, 0, 0, 0],
      [4, 0, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(game.score).toBe(12);
  });

  it("should move right", () => {
    const game = new State(cloneDeep(initialGrid));
    game.move("right", true);
    expect(game.grid).toEqual([
      [0, 0, 0, 4],
      [0, 0, 0, 4],
      [0, 0, 0, 4],
      [0, 0, 0, 0],
    ]);
    expect(game.score).toBe(12);
  });
});
