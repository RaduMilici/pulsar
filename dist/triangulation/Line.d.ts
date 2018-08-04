import Vector from './Vector';
import id from '../interfaces/id';
import Triangle from './Triangle';
export default class Line implements id {
  readonly a: Vector;
  readonly b: Vector;
  id: number;
  static AllLines: Line[];
  constructor(a: Vector, b: Vector);
  readonly length: number;
  clone(): Line;
  equals(line: Line): boolean;
  makeDisjoinedSets(): void;
  static GetUniqueLines(triangles: Triangle[]): Line[];
  static PointsFromArray(lines: Line[]): Vector[];
  static IsUnique(line: Line, lines: Line[]): boolean;
  static RemoveDuplicates(lines: Line[]): Line[];
}
//# sourceMappingURL=Line.d.ts.map
