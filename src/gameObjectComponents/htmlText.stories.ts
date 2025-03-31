import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Example/GameObject",
  argTypes: {
    align: {
      options: ["left", "center", "right"],
      control: {
        type: "select",
      },
    },
    verticalAlign: {
      options: ["top", "middle", "bottom"],
      control: {
        type: "select",
      },
    },
  },
};

export default meta;

export const HtmlText: StoryObj<{
  text: string;
  autoWrap: boolean;
  fontSize: number;
  align: "left" | "center" | "right";
  verticalAlign: "top" | "middle" | "bottom";
}> = {
  args: {
    text: "Lorem <b>ipsum</b> <red>dolor</red> sit amet, consectetur adipiscing elit. Curabitur varius, sem pellentesque pretium porta, erat risus tincidunt lacus, ac euismod metus risus eleifend lorem.",
    autoWrap: true,
    fontSize: 16,
    align: "left",
    verticalAlign: "top",
  },
  render: (args) => {
    const { text, autoWrap, align, verticalAlign } = args;
    return createStorybookGame((game) => {
      const go = new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
        width: 300,
        height: 300,
        x: 100,
        y: 100,
        htmlText: {
          text,
          style: {
            align,
            verticalAlign,
            fontSize: args.fontSize,
            tagStyles: {
              red: {
                fill: "red",
              },
            },
          },
          autoWrap,
        },
      });

      game.append(go);
    });
  },
};
