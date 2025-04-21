import { GameObjectProps } from "@/gameObject";

export { GameObject, type GameObjectProps } from "@/gameObject";
export { Game } from "@/game";

export type GameObjectPropsPick<P extends keyof GameObjectProps> = Pick<
  GameObjectProps,
  P
>;

export {
  MouseEvents,
  type MouseEvent,
} from "@/gameObjectComponents/mouseEvents";

export { AbstractFilter } from "@/filters/abstractFilter";
export * as defaultVertexShader from "@/filters/default.vert";
