import { BackgroundImageOptions } from "@/components/backgroundImage";
import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import type { Meta, StoryObj } from "@storybook/html";

const sizeOptions = [
  "percentage",
  "auto",
  "cover",
  "contain",
  "resizeGameObject",
];
const meta: Meta = {
  title: "Example/GameObject",
  argTypes: {
    size: {
      options: sizeOptions,
      control: "select",
    },
    vertical: {
      control: "number",
      if: {
        arg: "size",
        eq: "percentage",
      },
    },
    horizontal: {
      control: "number",
      if: {
        arg: "size",
        eq: "percentage",
      },
    },
    positionType: {
      options: ["position", "number"],
      control: "select",
    },
    positionXPosition: {
      if: {
        arg: "positionType",
        eq: "position",
      },
      options: ["center", "left", "right"],
      control: "select",
    },
    positionYPosition: {
      if: {
        arg: "positionType",
        eq: "position",
      },
      options: ["center", "top", "bottom"],
      control: "select",
    },
    positionXNumber: {
      if: {
        arg: "positionType",
        eq: "number",
      },
      control: "number",
    },
    positionYNumber: {
      if: {
        arg: "positionType",
        eq: "number",
      },
      control: "number",
    },
  },
};

export default meta;

export const BackgroundImage: StoryObj<{
  src: BackgroundImageOptions["src"];
  size: BackgroundImageOptions["size"];
  vertical: number;
  horizontal: number;
  positionXPosition: "center" | "left" | "right";
  positionYPosition: "center" | "top" | "bottom";
  positionXNumber: number;
  positionYNumber: number;
  positionType: "position" | "number";
}> = {
  args: {
    src: "https://i.imgur.com/7dXhnur.png",
    size: "auto",
  },
  render: (args) => {
    const { src } = args;
    return createStorybookGame((game) => {
      const options = {
        src,
        size: args.size,
      } as BackgroundImageOptions;

      if (args.size === "percentage" && options.size === "percentage") {
        options.vertical = args.vertical;
        options.horizontal = args.horizontal;
      }

      if (args.positionType === "position") {
        options.position = {
          x: args.positionXPosition,
          y: args.positionYPosition,
        };
      }

      if (args.positionType === "number") {
        options.position = {
          x: args.positionXNumber,
          y: args.positionYNumber,
        };
      }

      const go = new GameObject({
        backgroundImage: options,
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
