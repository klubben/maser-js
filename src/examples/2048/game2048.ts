import { Score } from "@/examples/2048/score";
import { State } from "@/examples/2048/state";
import { Tile, tileGap, tileHeight, tileWidth } from "@/examples/2048/tile";
import { GameObject } from "@/gameObject";
import { rgb } from "@/utils/rgb";

const rows = 4;
const columns = 4;

const tileColors = {
  0: 0x8a8888,
  1: rgb(224, 215, 205),
  2: rgb(223, 211, 188),
  3: rgb(228, 167, 114),
  4: rgb(231, 140, 93),
  5: rgb(232, 117, 89),
  6: rgb(232, 88, 56),
  7: rgb(223, 195, 107),
  8: rgb(223, 192, 91),
  9: rgb(223, 188, 75),
  10: rgb(223, 185, 59),
  11: rgb(223, 183, 43),
  12: rgb(170, 126, 169),
  13: rgb(158, 91, 161),
  14: rgb(146, 68, 153),
};

export class Game2048 extends GameObject {
  private _grid: Tile[][] = [];
  private readonly _gridContainer: GameObject;
  private readonly _score: Score;

  constructor() {
    super({
      width: columns * tileWidth + tileGap * (columns + 1),
      height: rows * tileHeight + tileGap * (columns + 1),
      backgroundColor: 0x6b6b6b,
    });

    this._gridContainer = new GameObject({
      width: columns * tileWidth + tileGap * (columns - 1),
      height: rows * tileHeight + tileGap * (columns - 1),
      x: tileGap,
      y: tileGap,
    });
    this.append(this._gridContainer);

    this._score = new Score();
    this.append(this._score);

    this._createGrid();
  }

  private _createGrid() {
    this._grid = [];
    for (let i = 0; i < rows; i++) {
      this._grid[i] = [];
      for (let j = 0; j < columns; j++) {
        const tile = new Tile({ i, j });
        this._grid[i][j] = tile;
        this._gridContainer.append(tile);
      }
    }
  }

  private _getTileColor(value: number): number {
    const squareRoot = Math.log2(value);
    if (squareRoot < 0) {
      return tileColors[0];
    }
    if (squareRoot > 14) {
      return tileColors[14];
    }
    return tileColors[squareRoot as keyof typeof tileColors];
  }

  updateState(state: State) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const tile = this._grid[i][j];
        const value = state.grid[i][j];
        tile.setText(value > 0 ? value.toString() : "");
        tile.setColor(this._getTileColor(value));
      }
    }

    this._score.setScore(state.score);
  }
}
