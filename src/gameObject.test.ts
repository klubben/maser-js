import { GameObject } from "@/gameObject";
import { describe, expect, it } from "vitest";

describe("GameObject nesting", () => {
  it("should have id", () => {
    const gameObject = new GameObject();
    const gameObject2 = new GameObject();

    expect(gameObject.id).toBe("game-object-1");
    expect(gameObject2.id).toBe("game-object-2");
  });

  it("should be able to append other gameObjects", () => {
    const gameObject = new GameObject();
    const gameObject2 = new GameObject();

    expect(async () => {
      gameObject.append(gameObject2);
    }).not.toThrow();
  });

  it("should return children", () => {
    const gameObject = new GameObject();
    const gameObject2 = new GameObject();
    gameObject.append(gameObject2);

    expect(gameObject.getChildren()).toHaveLength(1);
    expect(gameObject.getChildren()[0]).toBe(gameObject2);
    expect(gameObject2.getChildren()).toHaveLength(0);
  });

  it("should have parent when attached", () => {
    const gameObject = new GameObject();
    const gameObject2 = new GameObject();
    gameObject.append(gameObject2);

    expect(gameObject2.getParent()).toBe(gameObject);
  });

  it("should change parent when reattached", () => {
    const gameObject = new GameObject();
    const gameObject2 = new GameObject();

    gameObject.append(gameObject2);
    expect(gameObject2.getParent()).toBe(gameObject);

    const gameObject3 = new GameObject();

    gameObject3.append(gameObject2);

    expect(gameObject2.getParent()).toBe(gameObject3);
    expect(gameObject.getChildren()).toHaveLength(0);
  });

  it("should have parents array", () => {
    const gameObject = new GameObject();
    const gameObject2 = new GameObject();
    const gameObject3 = new GameObject();

    gameObject.append(gameObject2);
    gameObject2.append(gameObject3);

    const parents = gameObject3.getParents();

    expect(parents).toHaveLength(2);
    expect(parents[1]).toBe(gameObject);
    expect(parents[0]).toBe(gameObject2);
  });

  it("should append array of gameObjects", () => {
    const gameObject = new GameObject();
    const gameObject2 = new GameObject();
    const gameObject3 = new GameObject();

    expect(() => {
      gameObject.append([gameObject2, gameObject3]);
    }).not.toThrow();

    expect(gameObject.getChildren()).toHaveLength(2);
    expect(gameObject.getChildren()).toContain(gameObject2);
    expect(gameObject.getChildren()).toContain(gameObject3);
  });
});
