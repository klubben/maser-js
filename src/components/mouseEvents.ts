import { Dimensions } from "@/components/dimensions";
import { GameObjectEvents } from "@/components/gameObjectEvents";
import { GameObjectInterface } from "@/components/gameObjectInterface";
import { Container, FederatedPointerEvent } from "pixi.js";

type EventListener = (
  event: FederatedPointerEvent,
  gameObject: GameObjectInterface,
) => void;

type EventListenerMap = {
  click: EventListener[];
  enter: EventListener[];
  leave: EventListener[];
  move: EventListener[];
  down: EventListener[];
  up: EventListener[];
};

type PixiListener = (event: FederatedPointerEvent) => void;

export type MouseEvent = "click" | "enter" | "leave" | "move" | "down" | "up";

const mouseEventsMap: Record<MouseEvent, string> = {
  click: "click",
  enter: "mouseover",
  leave: "mouseout",
  move: "mousemove",
  down: "mousedown",
  up: "mouseup",
};

export class MouseEvents {
  private readonly _container: Container;
  private readonly _events: GameObjectEvents;
  private readonly _dimensions: Dimensions;
  private readonly _gameObject: GameObjectInterface;

  private _pixiListeners: Record<MouseEvent, PixiListener | null> = {
    click: null,
    enter: null,
    leave: null,
    move: null,
    down: null,
    up: null,
  };

  private _listeners: EventListenerMap = {
    click: [],
    enter: [],
    leave: [],
    move: [],
    down: [],
    up: [],
  };

  constructor(props: {
    container: Container;
    events: GameObjectEvents;
    dimensions: Dimensions;
    gameObject: GameObjectInterface;
    listeners?: {
      click?: EventListener;
      enter?: EventListener;
      leave?: EventListener;
      move?: EventListener;
      down?: EventListener;
      up?: EventListener;
    };
  }) {
    this._container = props.container;
    this._events = props.events;
    this._dimensions = props.dimensions;
    this._gameObject = props.gameObject;

    Object.entries(props.listeners ?? {}).forEach(([event, listener]) => {
      this.on(event as MouseEvent, listener);
    });
  }

  on(event: MouseEvent, listener: EventListener) {
    this._container.eventMode = "static";

    this._listeners[event].push(listener);
    if (!this._pixiListeners[event]) {
      this._pixiListeners[event] = (e: FederatedPointerEvent) => {
        this._listeners[event].forEach((l) => l(e, this._gameObject));
      };
      this._container.on(mouseEventsMap[event], this._pixiListeners[event]);
    }
  }

  off(event: MouseEvent, listener: EventListener) {
    if (this._listeners[event]) {
      this._listeners[event] = this._listeners[event].filter(
        (l) => l !== listener,
      );
    }
    if (this._listeners[event].length === 0 && this._pixiListeners[event]) {
      this._container.off(mouseEventsMap[event], this._pixiListeners[event]);
      delete this._pixiListeners[event];
    }

    if (
      Object.values(this._pixiListeners).filter((l) => l !== null).length === 0
    ) {
      this._container.eventMode = "none";
    }
  }
}
