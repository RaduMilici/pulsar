import Vector from './Vector';
import Line from './Line';
import Triangle from './Triangle';
import Triangulation from './Triangulation';
import DisjoinedSet from './DisjoinedSet';

export default class MinimumSpanningTree {
  readonly lines: Line[];
  private _nonMinSpanLines: Line[] = [];
  private readonly uniqueLines: Line[] = [];
  private readonly points: Vector[];

  constructor({ points, triangles }: Triangulation) {
    this.points = [...points];
    const triangleLines: Line[] = Triangle.LinesFromArray(triangles);
    this.uniqueLines = Line.UniqueFromArray(triangleLines);
    this.uniqueLines.sort((a: Line, b: Line) => a.length - b.length);
    this._nonMinSpanLines = [...this.uniqueLines];
  }

  get nonMinSpanLines(): Line[] {
    return this._nonMinSpanLines;
  }

  start(): void {
    this.points.forEach((point: Vector) => {
      new DisjoinedSet(point);
    });

    this.uniqueLines.forEach((line: Line, i: number) => {
      if (line.a.set.equals(line.b.set)) {
        line.b.set = line.a.set.merge(line.b.set);
        this.lines.push(line);
        this._nonMinSpanLines[i] = null;
      }
    });

    this._nonMinSpanLines = this._nonMinSpanLines.filter((line: Line) => line);
  }
}
