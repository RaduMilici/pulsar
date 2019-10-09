import { size, point, Vector } from '../../../src';
import DrawPoints from './DrawPoints';

export class Draw {
  private readonly context: CanvasRenderingContext2D;
  private readonly drawPoints: DrawPoints;
  
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d');
    this.drawPoints = new DrawPoints(this.context);
  }

  point(
    position: Vector,
    strokeColor?: string,
    fillColor?: string,
    size?: number
  ): void {
    this.drawPoints.point(position, strokeColor, fillColor, size)
  }

  points(
    points: Vector[],
    strokeColor?: string,
    fillColor?: string,
    size?: number
  ): void {
    this.drawPoints.points(points, strokeColor, fillColor, size);
  }

  clear(): void {
    this.context.clearRect(
      0, 0, this.context.canvas.width, this.context.canvas.height
    );
  }
}

export default Draw;
