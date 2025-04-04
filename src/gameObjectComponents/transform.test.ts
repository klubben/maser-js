import { GameObject } from "@/gameObject";
import { updatePixiTicker } from "@/testUtils/updatePixiTicker";
import { describe, expect, it, vi } from "vitest";

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

  it("should set scale", async () => {
    const gameObject = new GameObject({ scale: 2 });

    expect(gameObject.transform.scale).toBe(2);
  });

  it("should set single coordinate scale", async () => {
    const gameObject = new GameObject();
    gameObject.transform.scaleX = 2;
    gameObject.transform.scaleY = 3;

    expect(gameObject.transform.scaleX).toBe(2);
    expect(gameObject.transform.scaleY).toBe(3);
  });

  it("should set position", async () => {
    const callback = vi.fn();
    const gameObject = new GameObject();
    gameObject.transform.setPosition({ x: 10, y: 20, onComplete: callback });

    expect(gameObject.transform.x).toBe(10);
    expect(gameObject.transform.y).toBe(20);
    expect(callback).toBeCalled();
  });

  it("should set position with duration", async () => {
    const callback = vi.fn();
    const gameObject = new GameObject();
    gameObject.transform.setPosition({
      x: 10,
      y: 20,
      duration: 1,
      onComplete: callback,
    });

    await updatePixiTicker();

    expect(gameObject.transform.x).toBe(10);
    expect(gameObject.transform.y).toBe(20);
    expect(callback).toBeCalled();
  });

  it("should set position with duration and delay", async () => {
    const callback = vi.fn();
    const gameObject = new GameObject();
    gameObject.transform.setPosition({
      x: 10,
      y: 20,
      duration: 1,
      delay: 1,
      onComplete: callback,
    });

    await updatePixiTicker();

    expect(gameObject.transform.x).toBe(10);
    expect(gameObject.transform.y).toBe(20);
    expect(callback).toBeCalled();
  });

  it("should set position async", async () => {
    const gameObject = new GameObject();
    await gameObject.transform.setPositionAsync({
      x: 10,
      y: 20,
      duration: 10,
      delay: 10,
    });

    expect(gameObject.transform.x).toBe(10);
    expect(gameObject.transform.y).toBe(20);
  });
});
