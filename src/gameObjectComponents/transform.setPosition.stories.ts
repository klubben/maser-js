import { GameObject } from "@/gameObject";
import { createStorybookGame } from "@/testUtils/createStorybookGame";
import { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "GameObject",
};

export default meta;

export const SetPosition: StoryObj = {
  render: () => {
    const start = { x: 0, y: 200 };
    const end = { x: 200, y: 200 };

    return createStorybookGame((game) => {
      const go = new GameObject({
        border: {
          color: 0x000000,
          width: 1,
        },
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
        ...start,
      });

      let i = 0;
      go.mouseEvents.on("click", async () => {
        const target = i % 2 === 0 ? end : start;
        i++;
        await go.transform.setPositionAsync({
          ...target,
          duration: 200,
        });
        go.backgroundColor.color = i % 2 === 0 ? 0x00ff00 : 0xff0000;
      });

      game.append(go);
    });
  },
};
