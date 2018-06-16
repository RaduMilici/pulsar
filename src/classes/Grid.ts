import NavigatorTile from './NavigatorTile';
import size from '../interfaces/size';
import point from '../interfaces/point';
import row from '../interfaces/row';
import { int } from '../util/random';
import Obstacles from './Obstacles';

export default class Grid {
  readonly tiles: NavigatorTile[] = [];
  readonly rows: row[] = [];
  public readonly obstacles: Obstacles = new Obstacles(this);

  constructor(private size: size) {
    this.makeGrid();
  }

  randomTile(): NavigatorTile | null {
    const x = int(0, this.size.width - 1);
    const y = int(0, this.size.height - 1);

    return this.findTile({ x, y });
  }

  randomFreeTile(): NavigatorTile | null {
    return this.obstacles.getRandomOpen();
  }

  findTile(position: point): NavigatorTile | null {
    return Grid.getTile(position, this.rows);
  }

  private static getTile({ x, y }: point, list: row[]): NavigatorTile | null {
    const row: row = list[y];
    return (row && row.length > x) ? row[x] : null;
  }

  private makeGrid(): void {
    for (let y = 0; y < this.size.height; y++) {
      const row: row = [];

      for (let x = 0; x < this.size.width; x++) {
        const tile: NavigatorTile = new NavigatorTile({ x, y });
        this.tiles.push(tile);
        row.push(tile);
      }

      this.rows.push(row);
    }
  }
}
