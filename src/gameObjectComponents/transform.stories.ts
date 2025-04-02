import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "GameObject",
  argTypes: {
    x: {
      control: "number",
    },
    y: {
      control: "number",
    },
    scaleX: {
      control: "number",
    },
    scaleY: {
      control: "number",
    },
  },
};

export default meta;

export const Transform: StoryObj<{
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}> = {
  args: {
    x: 100,
    y: 100,
    scaleX: 1,
    scaleY: 1,
  },
  render: (args) => {
    const { x, y, scaleX, scaleY } = args;
    return createStorybookGame((game) => {
      const go = new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
        backgroundColor: 0x00ff00,
        width: 130,
        height: 30,
        x,
        y,
        scale: {
          x: scaleX,
          y: scaleY,
        },
      });

      game.append(go);
    });
  },
};
