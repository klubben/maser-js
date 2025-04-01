import { Game2048 } from "@/examples/2048/game2048";
import { State } from "@/examples/2048/state";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Examples",
};

export default meta;

export const Story: StoryObj<{ color: string }> = {
  name: "2048",
  render: () => {
    return createStorybookGame((game) => {
      const state = new State();
      const board = new Game2048();

      board.updateState(state);
      game.append(board);

      game.keyboardEvents.on("keydown", (event) => {
        switch (event.key) {
          case "ArrowUp":
            state.move("up");
            break;
          case "ArrowDown":
            state.move("down");
            break;
          case "ArrowLeft":
            state.move("left");
            break;
          case "ArrowRight":
            state.move("right");
            break;
        }

        board.updateState(state);
      });
    });
  },
};
