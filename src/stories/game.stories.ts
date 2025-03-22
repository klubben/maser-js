import { createStorybookGame } from "@/stories/createStorybookGame";
import type { StoryObj } from "@storybook/html";

const meta = {
  title: "Example/Game",
};

export default meta;

export const Game: StoryObj = {
  args: {},
  render: () => {
    return createStorybookGame(() => {});
  },
};
