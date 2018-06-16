import size from '../interfaces/size';
import Tile from './Tile';
import point from '../interfaces/point';
import NavigatorTile from './NavigatorTile';

type row = Tile[];
type boundingBox = { top: number; bottom: number; left: number; right: number };

export default class Canvas {
  private readonly _canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private boundingBox: boundingBox;
  private rows: row[] = [];

  constructor(selector: string, private size: size) {
    this._canvas = document.querySelector(selector) as HTMLCanvasElement;
    this.context = this._canvas.getContext('2d');
    this.setSize(size);
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  drawGrid(gridSize: size, tileSize: size): void {
    this.boundingBox = this.getBoundingBox(gridSize, tileSize);

    for (let y = 0; y < gridSize.height; y++) {
      const row = [];
      for (let x = 0; x < gridSize.width; x++) {
        const coords: point = { x, y };
        const position: point = this.getTilePosition(coords, tileSize);
        const tile = new Tile(tileSize, position, coords, this.context);
        row.push(tile);
      }
      this.rows.push(row);
    }
  }

  getTile({ x, y }: point): Tile | null {
    const row: row = this.rows[y];

    if (!row) {
      return null;
    } else if (row.length < x) {
      return null;
    }

    return row[x];
  }

  private setSize({ width, height }: size): void {
    this._canvas.width = width;
    this._canvas.height = height;
  }

  private getTilePosition(coords: point, size: size): point {
    const offset = {
      x: coords.x * size.width,
      y: coords.y * size.height,
    };

    return {
      x: this.boundingBox.left + offset.x,
      y: this.boundingBox.top + offset.y,
    };
  }

  private getBoundingBox(gridSize: size, tileSize: size): boundingBox {
    const center: point = {
      x: Math.round(this.canvas.width / 2),
      y: Math.round(this.canvas.height / 2),
    };

    const { width, height } = Canvas.getGridSizeInPixels(gridSize, tileSize);
    const halfHeight: number = Math.round(height / 2);
    const halfWidth: number = Math.round(width / 2);

    return {
      top: center.y - halfHeight,
      bottom: center.y + halfHeight,
      left: center.x - halfWidth,
      right: center.x + halfWidth,
    };
  }

  private static getGridSizeInPixels(gridSize: size, tileSize: size): size {
    return {
      width: gridSize.width * tileSize.width,
      height: gridSize.height * tileSize.height,
    };
  }

  /*


  findTileByPixelCoords(pixelCoords: point): Tile | null {
    for (let r = 0; r < this._rows.length; r++) {
      const row: row = this._rows[r];

      for (let c = 0; c < row.length; c++) {
        const tile: Tile = row[c];
        if (tile.containsPoint(pixelCoords)) {
          return tile;
        }
      }
    }

    return null;
  }
   */
}
