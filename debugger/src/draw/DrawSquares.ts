import { Vector, point } from '../../../src';
import Draw from './Draw';
import { c_squareLine, c_squareFill } from './const';

export default class DrawSquares extends Draw {
  square = (
    { x, y }: Vector,
    side: number,
    size: number = 1,
    fillColor: string = c_squareFill,
    lineColor: string = c_squareLine
  ): void => {
    this.context.beginPath();
    this.context.fillStyle = `${fillColor}`;
    this.context.strokeStyle = `${lineColor}`;
    this.context.rect(x, y, side, side);
    this.context.lineWidth = size;
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
  };

  squares(
    positons: Vector[],
    side: number,
    size: number,
    fillColor?: string,
    lineColor?: string
  ): void {
    positons.forEach(position => this.square(position, side, size, fillColor, lineColor));
  }
}
