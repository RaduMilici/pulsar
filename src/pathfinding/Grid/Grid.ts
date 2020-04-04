import I_Obstacles from '../Obstacles/I_Obstacles';
import Obstacles from '../Obstacles/Obstacles';
import I_NavigatorTile from '../NavigatorTile/I_NavigatorTile';
import NavigatorTile from '../NavigatorTile/NavigatorTile';
import Vector from '../../common/Vector';
import { randomInt } from '../../util';
import { point, size } from '../../interfaces';
import { DEFAULT_GRID_SIZE, MIN_GRID_SIZE_ERROR } from '../../constants';
import I_Grid from './I_Grid';

export default class Grid implements I_Grid {
  readonly obstacles: I_Obstacles;
  readonly tiles: I_NavigatorTile[] = [];
  readonly rows: I_NavigatorTile[][] = [];

  constructor(readonly size: size = DEFAULT_GRID_SIZE) {
    this.checkMinimumGridSize();
    this.makeGrid();
    this.obstacles = new Obstacles(this);
  }

  /** Returns a tile at the specified coordinates. */
  getTile({ x, y }: point): I_NavigatorTile | null {
    const row: I_NavigatorTile[] = this.rows[y];
    return row && row.length > x ? row[x] : null;
  }

  /** Returns a random tile, can be an obstacle or not. */
  getRandomTile(): I_NavigatorTile {
    const x: number = randomInt(0, this.size.width - 1);
    const y: number = randomInt(0, this.size.height - 1);
    return this.getTile({ x, y });
  }

  /** Returns a random non-obstacle tile, if it exists. */
  getRandomFreeTile(): I_NavigatorTile | null {
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
      const row: I_NavigatorTile[] = [];

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
