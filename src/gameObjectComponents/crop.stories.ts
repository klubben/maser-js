import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "GameObject",
};

export default meta;

export const Crop: StoryObj<{ isActive: boolean }> = {
  args: {
    isActive: false,
  },
  render: (args) => {
    const { isActive } = args;
    return createStorybookGame((game) => {
      const go = new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        isCropped: isActive,
      });

      const go2 = new GameObject({
        backgroundColor: 0xff0000,
        width: 100,
        height: 100,
        x: 50,
        y: 50,
      });

      const go3 = new GameObject({
        backgroundColor: 0x00ff00,
        width: 50,
        height: 100,
        x: 10,
        y: 10,
      });

      go.append(go2);
      go.append(go3);

      game.append(go);
    });
  },
};
