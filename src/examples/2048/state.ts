export type Position = {
  x: number;
  y: number;
};

export type Direction = "up" | "down" | "left" | "right";

export class State {
  private readonly _grid: number[][] = [];
  private _score: number;

  constructor(grid?: number[][]) {
    if (grid) {
      this._grid = grid;
    } else {
      this._createGrid();
    }

    this._score = 0;
  }

  private _createGrid() {
    for (let i = 0; i < 4; i++) {
      this._grid[i] = [0, 0, 0, 0];
    }

    this._addRandomTile();
    this._addRandomTile();
  }

  private _gameOver() {}

  private _addRandomTile(): void {
    const emptyTiles: Position[] = [];

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this._grid[i][j] === 0) {
          emptyTiles.push({ x: i, y: j });
        }
      }
    }

    if (emptyTiles.length === 0) {
      this._gameOver();
      return;
    }

    const randomTile =
      emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    this._grid[randomTile.x][randomTile.y] = Math.random() < 0.9 ? 2 : 4;
  }

  private _merge(column: number[]): number[] {
    const newColumn = column.filter((tile) => tile !== 0);
    for (let i = 0; i < newColumn.length - 1; i++) {
      if (newColumn[i] === newColumn[i + 1]) {
        newColumn[i] *= 2;
        this._score += newColumn[i];
        newColumn.splice(i + 1, 1);
      }
    }
    while (newColumn.length < 4) {
      newColumn.push(0);
    }

    return newColumn;
  }

  private _moveUp(): void {
    for (let j = 0; j < 4; j++) {
      const column = this._grid.map((row) => row[j]);
      const newColumn = this._merge(column);
      for (let i = 0; i < 4; i++) {
        this._grid[i][j] = newColumn[i];
      }
    }
  }

  private _moveDown(): void {
    for (let j = 0; j < 4; j++) {
      const column = this._grid.map((row) => row[j]);
      const newColumn = this._merge(column.reverse()).reverse();
      for (let i = 0; i < 4; i++) {
        this._grid[i][j] = newColumn[i];
      }
    }
  }

  private _moveLeft(): void {
    for (let i = 0; i < 4; i++) {
      const row = this._grid[i];
      this._grid[i] = this._merge(row);
    }
  }

  private _moveRight(): void {
    for (let i = 0; i < 4; i++) {
      const row = this._grid[i].slice().reverse();
      this._grid[i] = this._merge(row).reverse();
    }
  }

  move(direction: Direction, doNotCreateNewTiles = false): void {
    switch (direction) {
      case "up":
        this._moveUp();
        break;
      case "down":
        this._moveDown();
        break;
      case "left":
        this._moveLeft();
        break;
      case "right":
        this._moveRight();
        break;
    }

    if (!doNotCreateNewTiles) {
      this._addRandomTile();
    }
  }

  get grid(): number[][] {
    return this._grid;
  }

  get score(): number {
    return this._score;
  }
}
