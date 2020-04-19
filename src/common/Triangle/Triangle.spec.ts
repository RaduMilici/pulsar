import Triangle from './Triangle';
import Vector from '../Vector';
import { I_Line } from '../Line';
import { v00, v11, v22, v33 } from '../../../specs/common/fixtures/Vectors';
import { ab, bc, ca } from '../../../specs/common/fixtures/Lines';

describe('common / Triangle', () => {
  it('stores ab, bc and ca lines', () => {
    const triangle: Triangle = new Triangle(v00, v11, v22);

    expect(triangle.lines.ab).toMatchObject(ab);
    expect(triangle.lines.bc).toMatchObject(bc);
    expect(triangle.lines.ca).toMatchObject(ca);
  });

  it('gets its centroid', () => {
    const v22b: Vector = new Vector({ x: 2, y: 0 });
    const triangle: Triangle = new Triangle(v00, v11, v22b);
    const correct: Vector = new Vector({ x: 1, y: 0.33 });

    expect(triangle.centroid.x).toBeCloseTo(correct.x, 2);
    expect(triangle.centroid.y).toBeCloseTo(correct.y, 2);
  });

  it('stores its points in an array', () => {
    const triangle: Triangle = new Triangle(v00, v11, v22);

    expect(triangle.points).toEqual([v00, v11, v22]);
  });

  it('stores its lines in an array', () => {
    const triangle: Triangle = new Triangle(v00, v11, v22);

    expect(triangle.linesArray).toMatchObject([ab, bc, ca]);
  });

  it('checks equality with another triangle', () => {
    const triangle1: Triangle = new Triangle(v00, v11, v22);
    const correct: Triangle = new Triangle(v00, v11, v22);
    const incorrect: Triangle = new Triangle(v00, v11, v33);

    expect(triangle1.equals(correct)).toBe(true);
    expect(triangle1.equals(incorrect)).toBe(false);
  });

  it('checks if a point is contained in its circumcircle', () => {
    const v22b: Vector = new Vector({ x: 1, y: 0 });
    const pointInside: Vector = new Vector({ x: 0.5, y: 0.33 });
    const pointOutside: Vector = new Vector({ x: 1, y: 1.1 });
    const triangle: Triangle = new Triangle(v00, v11, v22b);

    expect(triangle.isPointInCircumcircle(pointInside)).toBe(true);
    expect(triangle.isPointInCircumcircle(pointOutside)).toBe(false);
  });

  it('checks if it has a point', () => {
    const triangle: Triangle = new Triangle(v00, v11, v22);

    expect(triangle.hasPoint(v00)).toBe(true);
    expect(triangle.hasPoint(v33)).toBe(false);
  });

  it('checks if it has any point from an array', () => {
    const triangle: Triangle = new Triangle(v00, v11, v22);

    expect(triangle.hasAnyPoint([v00, v11, v22])).toBe(true);
    expect(triangle.hasAnyPoint([v33])).toBe(false);
  });

  it('returns lines from an array of Triangles', () => {
    const triangle1: Triangle = new Triangle(v00, v11, v22);
    const triangle2: Triangle = new Triangle(v00, v11, v22);
    const triangles: Triangle[] = [triangle1, triangle2];
    const correct: I_Line[] = [ab, bc, ca, ab, bc, ca];

    expect(Triangle.LinesFromArray(triangles)).toMatchObject(correct);
  });

  it('finds unique lines from an array of Triangles', () => {
    const triangle1: Triangle = new Triangle(v00, v11, v22);
    const triangle2: Triangle = new Triangle(v00, v11, v33);

    const unique: I_Line[] = Triangle.GetUniqueLines([triangle1, triangle2]);
    const correct: I_Line[] = [
      triangle1.lines.bc,
      triangle1.lines.ca,
      triangle2.lines.bc,
      triangle2.lines.ca,
    ];

    expect(unique).toEqual(correct);
  });
});
