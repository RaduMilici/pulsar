import I_BoundingBox from '../BoundingBox/I_BoundingBox';
import I_Vector from '../Vector/I_Vector';
import I_Line from '../Line/I_Line';
import Vector from '../Vector/Vector';
import Line from '../Line/Line';
import BoundingBox from '../BoundingBox/BoundingBox';
import { isOdd } from '../../util/number';

export default class Shape {
  readonly lines: I_Line[];

  constructor(public readonly points: I_Vector[]) {
    this.lines = Shape.makeLines(points);
  }

  get boundingBox(): I_BoundingBox {
    return new BoundingBox(this.points);
  }

  containsPoint(point: I_Vector): boolean {
    // Use a more robust ray casting algorithm
    // Cast a ray to the right and count intersections
    let intersects = 0;
    const points = this.points;
    const n = points.length;
    
    for (let i = 0; i < n; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % n];
      
      // Check if the ray from point to the right intersects edge p1->p2
      if (((p1.y > point.y) !== (p2.y > point.y)) &&
          (point.x < (p2.x - p1.x) * (point.y - p1.y) / (p2.y - p1.y) + p1.x)) {
        intersects++;
      }
    }
    
    return (intersects % 2) === 1;
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
