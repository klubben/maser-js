import { BackgroundImageOptions } from "@/components/backgroundImage";
import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Example/GameObject",
  argTypes: {
    src: {
      control: { type: "text" },
    },
    size: {
      options: ["cover", "contain", "resizeGameObject", "custom"],
      control: { type: "select" },
    },
    sizeWidth: {
      control: { type: "text" },
      if: {
        arg: "size",
        eq: "custom",
      },
    },
    sizeHeight: {
      control: { type: "text" },
      if: {
        arg: "size",
        eq: "custom",
      },
    },

    x: {
      options: ["center", "left", "right", "custom"],
      control: { type: "select" },
    },
    positionX: {
      control: { type: "text" },
      if: {
        arg: "x",
        eq: "custom",
      },
    },

    y: {
      options: ["center", "top", "bottom", "custom"],
      control: { type: "select" },
    },
    positionY: {
      control: { type: "text" },
      if: {
        arg: "y",
        eq: "custom",
      },
    },
  },
};

export default meta;

const defaultArgs = {
  src: "https://i.imgur.com/7dXhnur.png",
  size: "cover",
  sizeWidth: "50%",
  sizeHeight: "50%",
  x: "center",
  y: "center",
  positionX: "50%",
  positionY: "50%",
};

const render = (
  args: typeof defaultArgs,
  component: "backgroundImage" | "mask",
) => {
  return createStorybookGame((game) => {
    const options = {
      src: args.src,
      size: args.size,
      position: {
        x: args.x,
        y: args.y,
      },
    } as BackgroundImageOptions;

    if (args.size === "custom") {
      options.size = {
        width: args.sizeWidth,
        height: args.sizeHeight,
      };
    }

    if (args.x === "custom") {
      options.position!.x = args.positionX;
    }

    if (args.y === "custom") {
      options.position!.y = args.positionY;
    }

    const go = new GameObject({
      [component]: options,
      border: {
        color: 0x000000,
        width: 1,
      },
      backgroundColor: 0xffffff,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
    });

    game.append(go);
  });
};

export const BackgroundImage: StoryObj<typeof defaultArgs> = {
  args: defaultArgs,
  render: (args) => render(args, "backgroundImage"),
};

export const Mask: StoryObj<typeof defaultArgs> = {
  args: defaultArgs,
  render: (args) => render(args, "mask"),
};
