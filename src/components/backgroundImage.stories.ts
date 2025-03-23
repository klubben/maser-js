import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Example/GameObject",
};

export default meta;

export const BackgroundImage: StoryObj<{ src: string }> = {
  args: {
    src: "https://i.imgur.com/7dXhnur.png",
  },
  render: (args) => {
    const { src } = args;
    return createStorybookGame((game) => {
      const go = new GameObject({
        backgroundImage: {
          src,
        },
        border: {
          color: 0x000000,
          width: 1,
        },
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      });

      game.append(go);
    });
  },
};
