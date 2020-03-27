import { point, Vector } from '../../../src';
import Draw from './Draw';
import { c_pointStroke, c_pointFill, s_point } from './const';

export default class DrawPoints extends Draw {
  point(
    { x, y }: Vector,
    strokeColor: string = c_pointStroke,
    fillColor: string = c_pointFill,
    size: number = s_point
  ): void {
    const carth: point = this.toCarthesian({ x, y });
    this.context.beginPath();
    this.context.arc(carth.x, carth.y, size, 0, 2 * Math.PI);
    this.context.strokeStyle = strokeColor;
    this.context.fillStyle = fillColor;
    this.context.lineWidth = 1;
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
  }

  points(
    points: Vector[],
    strokeColor?: string,
    fillColor?: string,
    size?: number
  ): void {
    points.forEach((point: Vector) => {
      this.point(point, strokeColor, fillColor, size);
    });
  }
}
