import { Matrix2 } from '../Matrix';
import { isNumeric } from '../../util/number';
import I_Line from '../Line/I_Line';
import Vector from '../Vector';

// https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

export default class LineIntersection {
  private readonly x1: number;
  private readonly y1: number;
  private readonly x2: number;
  private readonly y2: number;
  private readonly x3: number;
  private readonly y3: number;
  private readonly x4: number;
  private readonly y4: number;
  private readonly efghDeterminant: number;

  constructor(private line1: I_Line, private line2: I_Line) {
    // points
    this.x1 = this.line1.a.x;
    this.y1 = this.line1.a.y;
    this.x2 = this.line1.b.x;
    this.y2 = this.line1.b.y;
    this.x3 = this.line2.a.x;
    this.y3 = this.line2.a.y;
    this.x4 = this.line2.b.x;
    this.y4 = this.line2.b.y;

    // shared matrices
    const e: Matrix2 = new Matrix2(this.x1, 1, this.x2, 1);
    const f: Matrix2 = new Matrix2(this.y1, 1, this.y2, 1);
    const g: Matrix2 = new Matrix2(this.x3, 1, this.x4, 1);
    const h: Matrix2 = new Matrix2(this.y3, 1, this.y4, 1);
    const efgh: Matrix2 = new Matrix2(
      e.determine(),
      f.determine(),
      g.determine(),
      h.determine()
    );
    this.efghDeterminant = efgh.determine();
  }

  get intersects(): boolean {
    const areValidCoords: boolean = isNumeric(this.point.x) && isNumeric(this.point.y);
    return areValidCoords && this.isOnSegments();
  }

  get point(): Vector {
    const x = this.getX();
    const y = this.getY();
    return new Vector({ x, y });
  }

  private getX(): number {
    const a: Matrix2 = new Matrix2(this.x1, this.y1, this.x2, this.y2);
    const b: Matrix2 = new Matrix2(this.x1, 1, this.x2, 1);
    const c: Matrix2 = new Matrix2(this.x3, this.y3, this.x4, this.y4);
    const d: Matrix2 = new Matrix2(this.x3, 1, this.x4, 1);
    const abcd: Matrix2 = new Matrix2(
      a.determine(),
      b.determine(),
      c.determine(),
      d.determine()
    );

    return abcd.determine() / this.efghDeterminant;
  }

  private getY(): number {
    const a: Matrix2 = new Matrix2(this.x1, this.y1, this.x2, this.y2);
    const b: Matrix2 = new Matrix2(this.y1, 1, this.y2, 1);
    const c: Matrix2 = new Matrix2(this.x3, this.y3, this.x4, this.y4);
    const d: Matrix2 = new Matrix2(this.y3, 1, this.y4, 1);
    const abcd: Matrix2 = new Matrix2(
      a.determine(),
      b.determine(),
      c.determine(),
      d.determine()
    );

    return abcd.determine() / this.efghDeterminant;
  }

  private isOnSegments(): boolean {
    const a: Matrix2 = new Matrix2(
      this.x1 - this.x3,
      this.x3 - this.x4,
      this.y1 - this.y3,
      this.y3 - this.y4
    );
    const b: Matrix2 = new Matrix2(
      this.x1 - this.x2,
      this.x3 - this.x4,
      this.y1 - this.y2,
      this.y3 - this.y4
    );
    const c: Matrix2 = new Matrix2(
      this.x1 - this.x2,
      this.x1 - this.x3,
      this.y1 - this.y2,
      this.y1 - this.y3
    );
    const d: Matrix2 = new Matrix2(
      this.x1 - this.x2,
      this.x3 - this.x4,
      this.y1 - this.y2,
      this.y3 - this.y4
    );

    const divisionAB: number = a.determine() / b.determine();
    const divisionCD: number = -(c.determine() / d.determine());

    const isOnSegmentA: boolean = divisionAB >= 0 && divisionAB <= 1;
    const isOnSegmentB: boolean = divisionCD >= 0 && divisionCD <= 1;

    return isOnSegmentA && isOnSegmentB;
  }
}
