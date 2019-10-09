import { Vector, Triangle } from '../../../src';
import DrawPoints from './DrawPoints';
import DrawTriangles from './DrawTriangles';
import ICanvasDrawer from '../interfaces/ICanvasDrawer';

export default class CanvasDrawer implements ICanvasDrawer {
  private readonly context: CanvasRenderingContext2D;
  private readonly drawPoints: DrawPoints;
  private readonly drawTriangles: DrawTriangles;
  
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d');
    this.drawPoints = new DrawPoints(this.context);
    this.drawTriangles = new DrawTriangles(this.context);
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

  triangles(
    triangles: Triangle[],
    strokeColor?: string,
    fillColor?: string,
    size?: number) {
      this.drawTriangles.triangles(triangles, strokeColor, fillColor, size);
  }

  clear(): void {
    this.context.clearRect(
      0, 0, this.context.canvas.width, this.context.canvas.height
    );
  }
}

