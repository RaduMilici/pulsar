import Vector from './Vector';
import id from '../interfaces/id';
import uniqueId from '../util/uniqueID';
import Triangle from './Triangle';

export default class Line implements id {
  id: number = uniqueId();
  static AllLines: Line[] = [];
  constructor(readonly a: Vector, readonly b: Vector) {}

  get length(): number {
    return this.a.sub(this.b).magnitude();
  }

  clone(): Line {
    return new Line(this.a, this.b);
  }

  equals(line: Line): boolean {
    const equalsNormal: boolean = this.a.equals(line.a) && this.b.equals(line.b);
    const equalsReverse: boolean = this.a.equals(line.b) && this.b.equals(line.a);
    return equalsNormal || equalsReverse;
  }

  static GetUniqueLines(triangles: Triangle[]): Line[] {
    const lines = Triangle.LinesFromArray(triangles);
    return lines.filter((line: Line) => Line.IsUnique(line, lines));
  }

  static PointsFromArray(lines: Line[]): Vector[] {
    return lines.reduce((accumulator: Vector[], line: Line) => {
      accumulator.push(...[line.a, line.b]);
      return accumulator;
    }, []);
  }

  static IsUnique(line: Line, lines: Line[]): boolean {
    return (
      lines.find((currentLine: Line) => {
        return line.id === currentLine.id ? false : line.equals(currentLine);
      }) === undefined
    );
  }

  static UniqueFromArray(lines: Line[]): Line[] {
    return lines.filter((line: Line) => {
      return Line.IsUnique(line, lines);
    });
  }
}
