import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import { parseHexColor } from "@/utils/parseHexColor";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "GameObject",
  argTypes: {
    color: {
      control: "color",
    },
  },
};

export default meta;

export const Border: StoryObj<{ color: string; width: number }> = {
  args: {
    color: "#ff0000",
    width: 10,
  },
  render: (args) => {
    const { color, width } = args;
    return createStorybookGame((game) => {
      const go = new GameObject({
        border: {
          color: parseHexColor(color),
          width,
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
