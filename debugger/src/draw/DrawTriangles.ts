import { point, Triangle } from '../../../src';
import Draw from './Draw';
import DrawLines from './DrawLines';
import { c_triangleLine, c_triangleFill, s_triangle } from './const';

export default class DrawTriangles extends Draw {
  drawLines: DrawLines;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.drawLines = new DrawLines(context);
  }

  triangle(
    { lines, a, b, c }: Triangle,
    strokeColor: string = c_triangleLine,
    fillColor: string = c_triangleFill,
    size: number = s_triangle
  ): void {
    const carthA: point = this.toCarthesian(a);
    const carthB: point = this.toCarthesian(b);
    const carthC: point = this.toCarthesian(c);
    this.context.beginPath();
    this.context.moveTo(carthA.x, carthA.y);
    this.context.lineTo(carthB.x, carthB.y);
    this.context.lineTo(carthC.x, carthC.y);
    this.context.closePath();
    this.context.fillStyle = fillColor;
    this.context.fill();
    this.drawLines.lines([lines.ab, lines.bc, lines.ca], strokeColor, size);
  }

  triangles(
    triangles: Triangle[],
    strokeColor?: string,
    fillColor?: string,
    size?: number
  ): void {
    triangles.forEach((triangle: Triangle) => {
      this.triangle(triangle, strokeColor, fillColor, size);
    });
  }
}
