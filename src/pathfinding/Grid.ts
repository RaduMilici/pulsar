import Obstacles from './Obstacles';
import { randomInt } from '../util';
import NavigatorTile from './NavigatorTile';
import { row, point, size } from '../interfaces';
import { Vector } from '../common';

const defaultSize: size = { width: 10, height: 10 };
type onTileCreate = (tile: NavigatorTile) => void;

export default class Grid {
  onTileCreate: onTileCreate = () => {};
  readonly obstacles: Obstacles = new Obstacles(this);
  readonly tiles: NavigatorTile[] = [];
  readonly rows: row[] = [];

  constructor(private size: size = defaultSize) {}

  /** Returns a random tile, can be an obstacle or not. */
  randomTile(): NavigatorTile {
    const x = randomInt(0, this.size.width - 1);
    const y = randomInt(0, this.size.height - 1);

    return this.findTile({ x, y });
  }

  /** Returns a random non-obstacle tile, if it exists. */
  randomFreeTile(): NavigatorTile | null {
    return this.obstacles.getRandomOpen();
  }

  /** Returns a tile at the specified coordinates. */
  findTile({ x, y }: point): NavigatorTile | null {
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
