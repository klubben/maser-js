import { GameObject } from "@/gameObject";

export class Score extends GameObject {
  constructor() {
    super({
      width: 200,
      height: 50,
      x: 10,
      y: 180,
      htmlText: {
        text: "Score: 0",
        style: {
          fontSize: 24,
          fill: "#000",
          align: "center",
          verticalAlign: "middle",
          fontFamily: "Arial",
          fontWeight: "bold",
        },
      },
    });
  }

  setScore(score: number) {
    this.htmlText.text = `Score: ${score}`;
  }
}
