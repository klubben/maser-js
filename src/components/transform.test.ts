import { GameObject } from "@/gameObject";
import { describe, expect, it } from "vitest";

describe("GameObject transform component", async () => {
  it("Should return x, y", async () => {
    const gameObject = new GameObject({ x: 10, y: 20 });

    expect(gameObject.transform.x).toBe(10);
    expect(gameObject.transform.y).toBe(20);
  });

  it("should return global position", async () => {
    const gameObject1 = new GameObject({ x: 10, y: 20 });
    const gameObject2 = new GameObject({ x: 10, y: 20 });
    const gameObject3 = new GameObject({ x: 10, y: 20 });

    gameObject1.append(gameObject2);
    gameObject2.append(gameObject3);

    expect(gameObject1.transform.getGlobalPosition()).toStrictEqual({
      x: 10,
      y: 20,
    });
    expect(gameObject2.transform.getGlobalPosition()).toStrictEqual({
      x: 20,
      y: 40,
    });
    expect(gameObject3.transform.getGlobalPosition()).toStrictEqual({
      x: 30,
      y: 60,
    });
  });

  it("should set global position", async () => {
    const gameObject1 = new GameObject({ x: 10, y: 20 });
    const gameObject2 = new GameObject({ x: 10, y: 20 });
    const gameObject3 = new GameObject({ x: 10, y: 20 });

    gameObject1.append(gameObject2);
    gameObject2.append(gameObject3);

    gameObject2.transform.setGlobalPosition({ x: 100, y: 200 });

    expect(gameObject1.transform.getGlobalPosition()).toStrictEqual({
      x: 10,
      y: 20,
    });
    expect(gameObject2.transform.getGlobalPosition()).toStrictEqual({
      x: 100,
      y: 200,
    });
    expect(gameObject3.transform.getGlobalPosition()).toStrictEqual({
      x: 110,
      y: 220,
    });
  });
});
