import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "GameObject",
};

export default meta;

export const Alpha: StoryObj<{ alpha: number }> = {
  args: {
    alpha: 0.5,
  },
  render: (args) => {
    return createStorybookGame((game) => {
      new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
        backgroundColor: 0x00ff00,
        width: 100,
        height: 100,
        alpha: args.alpha,
        parent: game,
      });

      const go = new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
        x: 150,
        backgroundColor: 0x00ff00,
        width: 100,
        height: 100,
        htmlText: {
          text: "Click me",
          style: {
            fontSize: 20,
            fill: "#000",
            align: "center",
            verticalAlign: "middle",
          },
        },
        alpha: 1,
        parent: game,
      });

      let i = 0;
      go.mouseEvents.on("click", async () => {
        const alpha = i % 2 === 0 ? 0.1 : 1;
        i++;
        go.alpha.setAlpha({
          alpha,
          duration: 200,
        });
      });

      const yellow = new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
        backgroundColor: 0xffff00,
        y: 150,
        width: 100,
        height: 100,
        parent: game,
      });

      const button = new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
        y: 250,
        width: 100,
        height: 30,
        parent: game,
        htmlText: {
          text: "Hide",
          style: {
            fontSize: 20,
            fill: "#000",
            align: "center",
            verticalAlign: "middle",
          },
        },
      });

      button.mouseEvents.on("click", async () => {
        if (button.htmlText.text === "Hide") {
          await yellow.alpha.hideAsync({ duration: 200 });
          button.htmlText.text = "Show";
        } else {
          await yellow.alpha.showAsync({ duration: 200 });
          button.htmlText.text = "Hide";
        }
      });
    });
  },
};
