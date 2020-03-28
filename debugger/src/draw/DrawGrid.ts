import { Grid, Vector, NavigatorTile, point } from '../../../src';
import DrawSquares from './DrawSquares';
import Draw from './Draw';
import { GRID_DEFAULT_SIDE } from './const';

export default class DrawGrid extends Draw {
  pixelWidth: number;
  private drawSquares: DrawSquares;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.pixelWidth = context.canvas.width - 50;
    this.drawSquares = new DrawSquares(context);
  }

  gridTile(grid: Grid, tile: NavigatorTile, lineSize?: number, fillColor?: string): void {
    const divideBy: number =
      grid.size.width > grid.size.height ? grid.size.width : grid.size.height;
    const squareSide: number = this.pixelWidth / divideBy;
    const halfGrid: number = this.pixelWidth / 2;
    const x = this.origin.x - halfGrid + tile.position.x * squareSide;
    const y = this.origin.y - halfGrid + tile.position.y * squareSide;
    const tilePosition: Vector = new Vector({ x, y });
    this.drawSquares.square(tilePosition, squareSide, lineSize, fillColor);
  }

  gridTiles(grid: Grid, tiles: NavigatorTile[], lineSize?: number, fillColor?: string): void {
    tiles.forEach((tile: NavigatorTile) => {
      this.gridTile(grid, tile, lineSize, fillColor);
    });
  }

  grid(grid: Grid, lineSize?: number): void {
    grid.tiles.forEach((tile: NavigatorTile) => {
      this.gridTile(grid, tile, lineSize);
    });
  }
}
