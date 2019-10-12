import { Grid, Vector, NavigatorTile, point } from '../../../src';
import DrawSquares  from './DrawSquares';
import Draw from './Draw';
import {
  c_line,
  s_line,
} from './const';

export default class DrawGrid extends Draw {
  private drawSquares: DrawSquares;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.drawSquares = new DrawSquares(context);
  }

  grid(grid: Grid, gridSide: number, lineSize?: number): void {
    const divideBy: number = 
      grid.size.width > grid.size.height ? 
      grid.size.width :
      grid.size.height;
    const squareSide: number = gridSide / divideBy;
    const halfGrid: number = gridSide / 2;
    const tilePositions: Vector[] = grid.tiles.map(({ position }: NavigatorTile) => {
      const x = this.origin.x - halfGrid + position.x * squareSide;
      const y = this.origin.y - halfGrid + position.y * squareSide;
      return new Vector({ x, y });
    });
    this.drawSquares.squares(tilePositions, squareSide, lineSize);
  }
}