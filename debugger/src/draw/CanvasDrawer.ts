import { Vector, Triangle, Line, QuadTree, Grid } from '../../../src';
import DrawPoints from './DrawPoints';
import DrawTriangles from './DrawTriangles';
import DrawLines from './DrawLines';
import DrawGrid from './DrawGrid';

export default class CanvasDrawer {
  private readonly context: CanvasRenderingContext2D;
  private readonly drawPoints: DrawPoints;
  private readonly drawTriangles: DrawTriangles;
  private readonly drawLines: DrawLines;
  private readonly drawGrid: DrawGrid;
  
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.context = this.canvas.getContext('2d');
    this.drawPoints = new DrawPoints(this.context);
    this.drawTriangles = new DrawTriangles(this.context);
    this.drawLines = new DrawLines(this.context);
    this.drawGrid = new DrawGrid(this.context);
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

  line(line: Line, color?: string, size?: number): void {
    this.drawLines.line(line, color, size);
  }

  lines(lines: Line[], color?: string, size?: number): void {
    this.drawLines.lines(lines, color, size);
  }

  quadTree(quadTree: QuadTree, color?: string, size?: number): void {
    this.lines(quadTree.shape.lines, color, size);
    quadTree.children.forEach((child: QuadTree) => {
      this.quadTree(child);            
      //child.children.forEach(this.drawLoop.bind(this));
    });
  }

  grid(grid: Grid, side: number) {
    this.drawGrid.grid(grid, side);
  }

  clear(): void {
    this.context.clearRect(
      0, 0, this.context.canvas.width, this.context.canvas.height
    );
  }
}

