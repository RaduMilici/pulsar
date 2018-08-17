import { Vector, Line, Triangle } from '../common';
import Hull from './Hull';
import MinimumSpanningTree from './MinimumSpanningTree';

export default class Triangulation {
  readonly lines: Line[] = [];
  readonly triangles: Triangle[] = [];
  readonly MST: MinimumSpanningTree;
  readonly hull: Hull;
  private holderTriangle: Triangle = Triangulation.MakeHolderTriangle();

  constructor(readonly points: Vector[]) {
    this.triangles.push(this.holderTriangle);
    this.hull = new Hull(this);
    this.MST = new MinimumSpanningTree(this);
  }

  start(): void {
    this.points.forEach((point: Vector) => {
      const badTriangles: Triangle[] = [];

      for (let i = this.triangles.length - 1; i >= 0; i--) {
        const triangle: Triangle = this.triangles[i];

        if (triangle.isPointInCircumcircle(point)) {
          this.triangles.splice(i, 1);
          badTriangles.push(triangle);
        }
      }

      const uniqueLines: Line[] = Line.GetUniqueLines(badTriangles);

      uniqueLines.forEach((line: Line) => {
        const triangle: Triangle = new Triangle(point, line.a, line.b);
        this.triangles.push(triangle);
      });
    });

    this.cleanHolderTriangle();
    this.addFinishedTriangulationLines();
  }

  private static MakeHolderTriangle(): Triangle {
    const side: number = Number.MAX_SAFE_INTEGER;
    const a: Vector = new Vector({ x: side / 2, y: -side });
    const b: Vector = new Vector({ x: -side, y: side });
    const c: Vector = new Vector({ x: side, y: side });

    return new Triangle(a, b, c);
  }

  private cleanHolderTriangle(): void {
    const { a, b, c } = this.holderTriangle;

    for (let i = this.triangles.length - 1; i >= 0; i--) {
      const triangle = this.triangles[i];

      if (triangle.hasAnyPoint([a, b, c])) {
        this.triangles.splice(i, 1);
      }
    }
  }

  private addFinishedTriangulationLines(): void {
    this.triangles.forEach((triangle: Triangle) => {
      this.lines.push(...triangle.linesArray);
    });
  }
}
