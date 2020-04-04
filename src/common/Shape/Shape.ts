import Vector from '../Vector/Vector';
import I_Vector from '../Vector/I_Vector';
import I_Line from '../Line/I_Line';
import Line from '../Line/Line';
import BoundingBox from '../BoundingBox/BoundingBox';
import { isOdd } from '../../util/number';

export default class Shape {
  readonly lines: I_Line[];

  constructor(public readonly points: I_Vector[]) {
    this.lines = Shape.makeLines(points);
  }

  get boundingBox(): BoundingBox {
    return new BoundingBox(this.points);
  }

  containsPoint(point: I_Vector): boolean {
    let intersects: number = 0;
    const checkPoint: I_Vector = new Vector({
      x: point.x,
      y: Number.MAX_SAFE_INTEGER,
    });
    const checkLine: I_Line = new Line(point, checkPoint);

    this.lines.forEach((line: I_Line) => {
      if (line.intersects(checkLine)) {
        intersects++;
      }
    });

    return isOdd(intersects);
  }

  get centroid(): I_Vector {
    return Vector.FindPolyCentroid(this.points);
  }

  private static makeLines(points: I_Vector[]): I_Line[] {
    const lines: I_Line[] = [];
    const ccwPoints: I_Vector[] = Vector.ArrangePointsCCW(points);

    for (let i = 1; i < ccwPoints.length; i++) {
      const a: I_Vector = ccwPoints[i - 1];
      const b: I_Vector = ccwPoints[i];
      const ab: I_Line = new Line(a, b);
      lines.push(ab);
    }

    const firstPoint: I_Vector = ccwPoints[0];
    const lastPoint: I_Vector = ccwPoints[ccwPoints.length - 1];
    const closingLine: I_Line = new Line(firstPoint, lastPoint);

    lines.push(closingLine);

    return lines;
  }
}
