import I_Vector from '../common/Vector/I_Vector';
import I_Line from '../common/Line/I_Line';
import Vector from '../common/Vector/Vector';
import Line from '../common/Line/Line';
import Triangle from '../common/Triangle/Triangle';
import I_Triangulation from './Triangulation/I_Triangulation';

export default class Hull {
  readonly lines: Line[] = [];
  private _points: I_Vector[];
  private readonly triangles: Triangle[];

  constructor({ triangles }: I_Triangulation) {
    this.triangles = triangles;
  }

  get points(): I_Vector[] {
    return this._points;
  }

  start(): void {
    const uniqueLines: I_Line[] = Triangle.GetUniqueLines(this.triangles);
    const uniquePoints: I_Vector[] = Line.PointsFromArray(uniqueLines);
    const ccwPoints: I_Vector[] = Vector.ArrangePointsCCW(uniquePoints);
    this._points = Vector.UniqueFromArray(ccwPoints);

    for (let i = 1; i < this._points.length; i++) {
      const line: I_Line = new Line(this._points[i - 1], this._points[i]);
      this.lines.push(line);
    }

    const closingLine: I_Line = new Line(this._points[this._points.length - 1], this._points[0]);
    this.lines.push(closingLine);
  }
}
