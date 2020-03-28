import { uniqueId } from '../../util';
import I_Line from './I_Line';
import DisjoinedSet from '../../triangulation/DisjoinedSet';
import LineIntersection from '../LineIntersection/LineIntersection';
import Vector from '../Vector';

export default class Line implements I_Line {
  id: string = uniqueId();
  constructor(readonly a: Vector, readonly b: Vector) {}

  get length(): number {
    return this.a.sub(this.b).magnitude();
  }

  get midpoint(): Vector {
    return this.a.midpoint(this.b);
  }

  clone(): I_Line {
    return new Line(this.a, this.b);
  }

  equals(line: I_Line): boolean {
    const equalsNormal: boolean = this.a.equals(line.a) && this.b.equals(line.b);
    const equalsReverse: boolean = this.a.equals(line.b) && this.b.equals(line.a);
    return equalsNormal || equalsReverse;
  }

  intersects(line: I_Line): boolean {
    return new LineIntersection(this, line).intersects;
  }

  intersectionPoint(line: I_Line): Vector {
    return new LineIntersection(this, line).point;
  }

  makeDisjoinedSets(): void {
    this.a.set = new DisjoinedSet(this.a);
    this.b.set = new DisjoinedSet(this.b);
  }

  static PointsFromArray(lines: Line[]): Vector[] {
    return lines.reduce((accumulator: Vector[], line: Line) => {
      accumulator.push(...[line.a, line.b]);
      return accumulator;
    }, []);
  }

  static IsUnique(line: I_Line, lines: I_Line[]): boolean {
    return (
      lines.find((currentLine: I_Line) => {
        return line.id === currentLine.id ? false : line.equals(currentLine);
      }) === undefined
    );
  }

  static RemoveDuplicates(lines: I_Line[]): I_Line[] {
    let clone: I_Line[] = [...lines];

    clone.sort((a: I_Line, b: I_Line) => a.length - b.length);

    for (let i = clone.length - 1; i >= 1; i--) {
      const a = clone[i];
      const b = clone[i - 1];

      if (a.equals(b)) {
        clone.splice(i, 1);
      }
    }

    return clone;
  }
}
