import I_Vector from '../../common/Vector/I_Vector';
import Vector from '../../common/Vector/Vector';
import I_Line from '../../common/Line/I_Line';
import Triangle from '../../common/Triangle/Triangle';
import I_Triangulation from './I_Triangulation';

export default class Triangulation implements I_Triangulation {
  readonly lines: I_Line[] = [];
  readonly triangles: Triangle[] = [];
  private holderTriangle: Triangle = Triangulation.MakeHolderTriangle();

  constructor(readonly points: I_Vector[]) {
    this.triangles.push(this.holderTriangle);
    this.triangulate();
  }

  private triangulate(): void {
    this.points.forEach((point: I_Vector) => {
      const badTriangles: Triangle[] = [];

      for (let i = this.triangles.length - 1; i >= 0; i--) {
        const triangle: Triangle = this.triangles[i];

        if (triangle.isPointInCircumcircle(point)) {
          this.triangles.splice(i, 1);
          badTriangles.push(triangle);
        }
      }

      const uniqueLines: I_Line[] = Triangle.GetUniqueLines(badTriangles);

      uniqueLines.forEach((line: I_Line) => {
        const triangle: Triangle = new Triangle(point, line.a, line.b);
        this.triangles.push(triangle);
      });
    });

    this.cleanHolderTriangle();
    this.addFinishedTriangulationLines();
  }

  private static MakeHolderTriangle(): Triangle {
    const side: number = Number.MAX_SAFE_INTEGER;

    return new Triangle(
      new Vector({ x: side / 2, y: -side }),
      new Vector({ x: -side, y: side }),
      new Vector({ x: side, y: side })
    );
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
    this.triangles.forEach((triangle: Triangle) => this.lines.push(...triangle.linesArray));
  }
}
