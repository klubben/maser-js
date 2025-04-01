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

export const BackgroundColor: StoryObj<{ color: string }> = {
  args: {
    color: "#ff0000",
  },
  render: (args) => {
    const { color } = args;
    return createStorybookGame((game) => {
      const go = new GameObject({
        backgroundColor: parseHexColor(color),
        width: 100,
        height: 100,
        x: 100,
        y: 100,
      });

      game.append(go);
    });
  },
};
