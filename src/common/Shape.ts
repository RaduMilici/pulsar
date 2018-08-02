import Vector from './Vector';
import Line from './Line';

export default class Shape {
  readonly lines: Line[];

  constructor(private points: Vector[]) {
    this.lines = Shape.makeLines(points);
  }

  containsPoint(point: Vector): boolean {
    let intersects: number = 0;
    const checkPoint: Vector = new Vector({ x: point.x, y: Number.MAX_SAFE_INTEGER });
    const checkLine: Line = new Line(point, checkPoint);

    this.lines.forEach((line: Line) => {
      if (line.intersects(checkLine)) {
        intersects++;
      }
    });

    return Math.abs(intersects % 2) === 1;
  }

  private static makeLines(points: Vector[]): Line[] {
    const lines: Line[] = [];
    const ccwPoints: Vector[] = Vector.ArrangePointsCCW(points);

    for (let i = 1; i < ccwPoints.length; i++) {
      const a: Vector = ccwPoints[i - 1];
      const b: Vector = ccwPoints[i];
      const ab = new Line(a, b);
      lines.push(ab);
    }

    const firstPoint: Vector = ccwPoints[0];
    const lastPoint: Vector = ccwPoints[ccwPoints.length - 1];
    const closingLine = new Line(firstPoint, lastPoint);

    lines.push(closingLine);

    return lines;
  }
}
