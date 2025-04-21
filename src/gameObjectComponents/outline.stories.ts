import { OutlineFilter } from "@/filters/outlineFilter";
import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import { parseHexColorF32A } from "@/utils/parseHexColor";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Filters",
  argTypes: {
    thickness: {
      control: {
        type: "number",
      },
    },
    color: {
      control: {
        type: "color",
      },
    },
  },
};

export default meta;

export const Outline: StoryObj<{ thickness: number; color: string }> = {
  args: {
    thickness: 3,
    color: "#ff0000",
  },
  render: (args) => {
    const { thickness, color } = args;
    return createStorybookGame((game) => {
      const go = new GameObject({
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        backgroundImage: {
          src: "https://i.imgur.com/7dXhnur.png",
          size: "contain",
        },
        parent: game,
      });

      const filter = new OutlineFilter({
        thickness,
        color: parseHexColorF32A(color),
      });

      go.filters.add(filter);
      filter.enable();
    });
  },
};
