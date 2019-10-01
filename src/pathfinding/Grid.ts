import Obstacles from './Obstacles';
import NavigatorTile from './NavigatorTile';
import { Vector } from '../common';
import { randomInt } from '../util';
import { row, point, size } from '../interfaces';
import { DEFAULT_GRID_SIZE, MIN_GRID_SIZE_ERROR } from '../constants';

export default class Grid {
  readonly obstacles: Obstacles = new Obstacles(this);
  readonly tiles: NavigatorTile[] = [];
  readonly rows: row[] = [];

  constructor(private size: size = DEFAULT_GRID_SIZE) {
    this.checkMinimumGridSize();
    this.makeGrid();
  }

  /** Returns a tile at the specified coordinates. */
  getTile({ x, y }: point): NavigatorTile | null {
    const row: row = this.rows[y];
    return row && row.length > x ? row[x] : null;
  }

  /** Returns a random tile, can be an obstacle or not. */
  getRandomTile(): NavigatorTile {
    const x: number = randomInt(0, this.size.width - 1);
    const y: number = randomInt(0, this.size.height - 1);
    return this.getTile({ x, y });
  }

  /** Returns a random non-obstacle tile, if it exists. */
  getRandomFreeTile(): NavigatorTile | null {
    return this.obstacles.getRandomOpen();
  }

  private checkMinimumGridSize(): void {
    const { width, height }: size = this.size;
    if (width <= 0 || height <= 0) {
      throw new Error(MIN_GRID_SIZE_ERROR);
    }
  }

  private makeGrid(): void {
    const { width, height }: size = this.size;

    for (let y: number = 0; y < height; y++) {
      const row: row = [];

      for (let x: number = 0; x < width; x++) {
        const tilePosition: Vector = new Vector({ x, y });
        const tile: NavigatorTile = new NavigatorTile(tilePosition);
        this.tiles.push(tile);
        row.push(tile);
      }

      this.rows.push(row);
    }
  }
}
