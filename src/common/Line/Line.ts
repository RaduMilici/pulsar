import { id } from '../../interfaces';
import { uniqueId } from '../../util';
import DisjoinedSet from '../../triangulation/DisjoinedSet';
import LineIntersection from '../LineIntersection/LineIntersection';
import Vector from '../Vector';

export default class Line implements id {
  id: string = uniqueId();
  constructor(readonly a: Vector, readonly b: Vector) {}

  get length(): number {
    return this.a.sub(this.b).magnitude();
  }

  get midpoint(): Vector {
    return this.a.midpoint(this.b);
  }

  clone(): Line {
    return new Line(this.a, this.b);
  }

  equals(line: Line): boolean {
    const equalsNormal: boolean = this.a.equals(line.a) && this.b.equals(line.b);
    const equalsReverse: boolean = this.a.equals(line.b) && this.b.equals(line.a);
    return equalsNormal || equalsReverse;
  }

  intersects(line: Line): boolean {
    return new LineIntersection(this, line).intersects;
  }

  intersectionPoint(line: Line): Vector {
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

  static IsUnique(line: Line, lines: Line[]): boolean {
    return (
      lines.find((currentLine: Line) => {
        return line.id === currentLine.id ? false : line.equals(currentLine);
      }) === undefined
    );
  }

  static RemoveDuplicates(lines: Line[]): Line[] {
    let clone: Line[] = [...lines];

    clone.sort((a: Line, b: Line) => a.length - b.length);

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
