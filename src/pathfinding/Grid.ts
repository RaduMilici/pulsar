import NavigatorTile from './NavigatorTile';
import size from '../interfaces/size';
import Vector from '../triangulation/Vector';
import row from '../interfaces/row';
import { int } from '../util/random';
import Obstacles from './Obstacles';

const defaultSize: size = { width: 10, height: 10 };

export default class Grid {
  readonly tiles: NavigatorTile[] = [];
  readonly rows: row[] = [];
  public readonly obstacles: Obstacles = new Obstacles(this);

  constructor(private size: size = defaultSize) {
    this.makeGrid();
  }

  /** Returns a random tile, obstacle or not. */
  randomTile(): NavigatorTile {
    const x = int(0, this.size.width - 1);
    const y = int(0, this.size.height - 1);

    return this.findTile(new Vector({ x, y }));
  }

  /** Returns a random non-obstacle tile, if it exists. */
  randomFreeTile(): NavigatorTile | null {
    return this.obstacles.getRandomOpen();
  }

  /** Returns a tile at the specified coordinates. */
  findTile({ x, y }: Vector): NavigatorTile | null {
    const row: row = this.rows[y];
    return row && row.length > x ? row[x] : null;
  }

  private makeGrid(): void {
    for (let y = 0; y < this.size.height; y++) {
      const row: row = [];

      for (let x = 0; x < this.size.width; x++) {
        const position = new Vector({ x, y });
        const tile: NavigatorTile = new NavigatorTile(position);
        this.tiles.push(tile);
        row.push(tile);
      }

      this.rows.push(row);
    }
  }
}
