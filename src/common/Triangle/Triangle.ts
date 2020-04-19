import I_Vector from '../Vector/I_Vector';
import I_Line from '../Line/I_Line';
import I_Triangle from './I_Triangle';
import Vector from '../Vector/Vector';
import Line from '../Line/Line';
import Matrix4 from '../Matrix/Matrix4';
import { triangleLines } from '../../interfaces';
import uniqueId from '../../util/uniqueID';

export default class Triangle implements I_Triangle {
  id: string = uniqueId();
  readonly lines: triangleLines;

  constructor(readonly a: I_Vector, readonly b: I_Vector, readonly c: I_Vector) {
    this.lines = {
      ab: new Line(a, b),
      bc: new Line(b, c),
      ca: new Line(c, a),
    };
  }

  get centroid(): I_Vector {
    return Vector.FindPolyCentroid(this.points);
  }

  get points(): I_Vector[] {
    return [this.a, this.b, this.c];
  }

  get linesArray(): I_Line[] {
    return [this.lines.ab, this.lines.bc, this.lines.ca];
  }

  equals(triangle: Triangle): boolean {
    const { ab, bc, ca } = this.lines;
    const sameAB: boolean =
      ab.equals(triangle.lines.ab) ||
      ab.equals(triangle.lines.bc) ||
      ab.equals(triangle.lines.ca);
    const sameBC: boolean =
      bc.equals(triangle.lines.ab) ||
      bc.equals(triangle.lines.bc) ||
      bc.equals(triangle.lines.ca);
    const sameCA: boolean =
      ca.equals(triangle.lines.ab) ||
      ca.equals(triangle.lines.bc) ||
      ca.equals(triangle.lines.ca);

    return sameAB && sameBC && sameCA;
  }

  isPointInCircumcircle(point: I_Vector): boolean {
    const ax = this.a.x;
    const ay = this.a.y;
    const bx = this.b.x;
    const by = this.b.y;
    const cx = this.c.x;
    const cy = this.c.y;

    const a: number = ax;
    const b: number = ay;
    const c: number = ax * ax + ay * ay;
    const d: number = 1;
    const e: number = bx;
    const f: number = by;
    const g: number = bx * bx + by * by;
    const h: number = 1;
    const i: number = cx;
    const j: number = cy;
    const k: number = cx * cx + cy * cy;
    const l: number = 1;
    const m: number = point.x;
    const n: number = point.y;
    const o: number = point.x * point.x + point.y * point.y;
    const p: number = 1;

    const matrix: Matrix4 = new Matrix4(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
    return matrix.determine() < 0;
  }

  hasPoint(point: I_Vector): boolean {
    return this.a.equals(point) || this.b.equals(point) || this.c.equals(point);
  }

  hasAnyPoint(points: I_Vector[]): boolean {
    return (
      points.filter((point: I_Vector) => {
        return this.hasPoint(point);
      }).length !== 0
    );
  }

  static LinesFromArray(triangles: I_Triangle[]): I_Line[] {
    return triangles.reduce((accumulator: I_Line[], triangle: I_Triangle) => {
      accumulator.push(...triangle.linesArray);
      return accumulator;
    }, []);
  }

  static GetUniqueLines(triangles: Triangle[]): I_Line[] {
    const lines: I_Line[] = Triangle.LinesFromArray(triangles);
    return lines.filter((line: I_Line) => Line.IsUnique(line, lines));
  }
}
