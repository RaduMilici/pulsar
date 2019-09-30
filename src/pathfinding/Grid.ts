import Obstacles from './Obstacles';
import { randomInt } from '../util';
import NavigatorTile from './NavigatorTile';
import { row, point, size, onTileCreate } from '../interfaces';
import { Vector } from '../common';
import { DEFAULT_GRID_SIZE, NO_OP } from '../constants';

export default class Grid {
  onTileCreate: onTileCreate = NO_OP;
  readonly obstacles: Obstacles = new Obstacles(this);
  readonly tiles: NavigatorTile[] = [];
  readonly rows: row[] = [];

  constructor(private size: size = DEFAULT_GRID_SIZE) {}

  /** Returns a random tile, can be an obstacle or not. */
  randomTile(): NavigatorTile {
    const x: number = randomInt(0, this.size.width - 1);
    const y: number = randomInt(0, this.size.height - 1);

    return this.getTile({ x, y });
  }

  /** Returns a random non-obstacle tile, if it exists. */
  randomFreeTile(): NavigatorTile | null {
    return this.obstacles.getRandomOpen();
  }

  /** Returns a tile at the specified coordinates. */
  getTile({ x, y }: point): NavigatorTile | null {
    const row: row = this.rows[y];
    return row && row.length > x ? row[x] : null;
  }

  makeGrid(): void {
    for (let y = 0; y < this.size.height; y++) {
      const row: row = [];

      for (let x = 0; x < this.size.width; x++) {
        const pos: Vector = new Vector({ x, y });
        const tile: NavigatorTile = new NavigatorTile(pos);
        this.onTileCreate(tile);
        this.tiles.push(tile);
        row.push(tile);
      }

      this.rows.push(row);
    }
  }
}
