import { Line, Vector, Triangle } from '../../src/common';
import DisjoinedSet from '../../src/triangulation/DisjoinedSet';
import { v1, v2, v3, v4 } from './fixtures/Vectors';

describe('Vector functionality', () => {
  it('set a and b points', () => {
    const line: Line = new Line(v1, v2);

    expect(line).toHaveProperty('a', v1);
    expect(line).toHaveProperty('b', v2);
  });

  it('calculates its length', () => {
    const line: Line = new Line(v1, v2);
    const length: number = line.length;

    expect(length).toBe(1.41);
  });

  it('calculates its midpoint', () => {
    const line: Line = new Line(v1, v2);
    const midpoint: Vector = line.midpoint;
    const correct: Vector = new Vector({ x: 0.5, y: 0.5 });

    expect(midpoint).toEqual(correct);
  });

  it('clones itself', () => {
    const line1: Line = new Line(v1, v2);
    const line2: Line = new Line(v1, v2);
    const clone: Line = line1.clone();

    expect(clone).toHaveProperty('a', line2.a);
    expect(clone).toHaveProperty('b', line2.b);
  });

  it('checks equality with another line', () => {
    const line1: Line = new Line(v1, v2);
    const line2: Line = new Line(v1, v2);
    const equals: boolean = line1.equals(line2);

    expect(equals).toBe(true);
  });

  it('checks intersection with another line', () => {
    const line1: Line = new Line(v1, v2);

    const v3b: Vector = new Vector({ x: 1, y: 0 });
    const v4b: Vector = new Vector({ x: 0, y: 1 });
    const line2: Line = new Line(v3b, v4b);

    const intersects: boolean = line1.intersects(line2);

    expect(intersects).toBe(true);
  });

  it('calculates intersection point with another line', () => {
    const line1: Line = new Line(v1, v2);

    const v3b: Vector = new Vector({ x: 1, y: 0 });
    const v4b: Vector = new Vector({ x: 0, y: 1 });
    const line2: Line = new Line(v3b, v4b);

    const intersectionPoint: Vector = line1.intersectionPoint(line2);
    const correct: Vector = new Vector({ x: 0.5, y: 0.5 });

    expect(intersectionPoint).toEqual(correct);
  });

  it('assigns disjoined sets to its points', () => {
    const line: Line = new Line(v1, v2);
    line.makeDisjoinedSets();

    expect(line.a.set).toBeInstanceOf(DisjoinedSet);
    expect(line.b.set).toBeInstanceOf(DisjoinedSet);
  });

  xit('finds unique lines from an array of Triangles', () => {
    const triangle1: Triangle = new Triangle(v1, v2, v3);
    const triangle2: Triangle = new Triangle(v2, v3, v4);

    const unique: Line[] = Line.GetUniqueLines([triangle1, triangle2]);

    expect(unique).toEqual(true);
  });

  it('finds all points from an array of Lines', () => {
    const line1: Line = new Line(v1, v2);
    const line2: Line = new Line(v3, v4);

    const points: Vector[] = Line.PointsFromArray([line1, line2]);
    expect(points).toEqual([v1, v2, v3, v4]);
  });

  it('finds a unique line in an array', () => {
    const line1: Line = new Line(v1, v2);
    const line2: Line = new Line(v1, v2);
    const line3: Line = new Line(v3, v4);

    const lines: Line[] = [line1, line2, line3];
    const isLine1Unique: boolean = Line.IsUnique(line1, lines);
    const isLine3Unique: boolean = Line.IsUnique(line3, lines);

    expect(isLine1Unique).toBe(false);
    expect(isLine3Unique).toBe(true);
  });

  it('removes duplicate lines from an array', () => {
    const line1: Line = new Line(v1, v2);
    const line2: Line = new Line(v1, v2);
    const line3: Line = new Line(v3, v4);
    const line4: Line = new Line(v3, v4);

    const unique: Line[] = Line.RemoveDuplicates([line1, line2, line3, line4]);

    expect(unique).toEqual([line1, line3]);
  });
});