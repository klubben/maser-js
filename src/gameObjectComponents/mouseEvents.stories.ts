import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "GameObject",
};

export default meta;

export const MouseEvents: StoryObj = {
  render: () => {
    return createStorybookGame((game) => {
      const go = new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
        backgroundColor: 0x00ff00,
        width: 130,
        height: 30,
        x: 10,
        y: 10,
        htmlText: {
          text: "Click me",
          style: {
            fontSize: 16,
            align: "center",
            verticalAlign: "middle",
          },
        },
      });

      go.mouseEvents.on("click", () => {
        go.backgroundColor.color = Math.random() * 0xffffff;
      });

      game.append(go);

      const go2 = new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
        backgroundColor: 0x00ff00,
        width: 130,
        height: 30,
        x: 10,
        y: 50,
        htmlText: {
          text: "Hover me",
          style: {
            fontSize: 16,
            align: "center",
            verticalAlign: "middle",
          },
        },
      });

      go2.mouseEvents.on("enter", () => {
        go2.backgroundColor.color = Math.random() * 0xffffff;
      });

      go2.mouseEvents.on("leave", () => {
        go2.backgroundColor.color = 0x00ff00;
      });

      game.append(go2);
    });
  },
};
