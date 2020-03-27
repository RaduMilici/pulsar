import { Vector, Line, Triangle } from '../common';
import Triangulation from './Triangulation';

export default class Hull {
  readonly lines: Line[] = [];
  private _points: Vector[];
  private readonly triangles: Triangle[];

  constructor({ triangles }: Triangulation) {
    this.triangles = triangles;
  }

  get points(): Vector[] {
    return this._points;
  }

  start(): void {
    const uniqueLines: Line[] = Triangle.GetUniqueLines(this.triangles);
    const uniquePoints: Vector[] = Line.PointsFromArray(uniqueLines);
    const ccwPoints: Vector[] = Vector.ArrangePointsCCW(uniquePoints);
    this._points = Vector.UniqueFromArray(ccwPoints);

    for (let i = 1; i < this._points.length; i++) {
      const line: Line = new Line(this._points[i - 1], this._points[i]);
      this.lines.push(line);
    }

    const closingLine: Line = new Line(
      this._points[this._points.length - 1],
      this._points[0]
    );
    this.lines.push(closingLine);
  }
}
