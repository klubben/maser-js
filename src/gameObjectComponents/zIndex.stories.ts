import { GameObject } from "@/gameObject";
import { MouseEvents } from "@/gameObjectComponents/mouseEvents";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "GameObject",
};

export default meta;

export const ZIndex: StoryObj = {
  render: () => {
    let zIndex = 2;
    return createStorybookGame((game) => {
      const go = new GameObject({
        backgroundColor: 0x00ff00,
        width: 100,
        height: 100,
        htmlText: {
          text: "Click me",
          style: {
            verticalAlign: "bottom",
          },
        },
        x: 10,
        y: 10,
        zIndex,
      });

      const go2 = new GameObject({
        backgroundColor: 0xff0000,
        width: 100,
        height: 100,
        htmlText: {
          text: "Click me",
          style: {
            verticalAlign: "bottom",
          },
        },
        x: 60,
        y: 60,
      });

      MouseEvents.on([go, go2], "click", (_, go) => {
        zIndex++;
        go.transform.zIndex = zIndex;
      });

      game.append([go, go2]);
    });
  },
};
