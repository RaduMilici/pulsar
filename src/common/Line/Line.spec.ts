import Line from './Line';
import I_Line from './I_Line';
import Vector from '../Vector/Vector';
import I_Vector from '../Vector/I_Vector';
import { DisjoinedSet } from '../../triangulation';
import { v00, v11, v22, v33 } from '../../../specs/common/fixtures/Vectors';

describe('common / Line', () => {
  it('set a and b points', () => {
    const line: I_Line = new Line(v00, v11);

    expect(line).toHaveProperty('a', v00);
    expect(line).toHaveProperty('b', v11);
  });

  it('calculates its length', () => {
    const line: I_Line = new Line(v00, v11);
    const length: number = line.length;

    expect(length).toBeCloseTo(1.41, 2);
  });

  it('calculates its midpoint', () => {
    const line: I_Line = new Line(v00, v11);
    const midpoint: I_Vector = line.midpoint;
    const correct: I_Vector = new Vector({ x: 0.5, y: 0.5 });

    expect(midpoint).toEqual(correct);
  });

  it('clones itself', () => {
    const line1: I_Line = new Line(v00, v11);
    const line2: I_Line = new Line(v00, v11);
    const clone: I_Line = line1.clone();

    expect(clone).toHaveProperty('a', line2.a);
    expect(clone).toHaveProperty('b', line2.b);
  });

  it('checks equality with another line', () => {
    const line1: I_Line = new Line(v00, v11);
    const line2: I_Line = new Line(v00, v11);
    const equals: boolean = line1.equals(line2);

    expect(equals).toBe(true);
  });

  it('checks intersection with another line', () => {
    const line1: I_Line = new Line(v00, v11);

    const v22b: I_Vector = new Vector({ x: 1, y: 0 });
    const v33b: I_Vector = new Vector({ x: 0, y: 1 });
    const line2: I_Line = new Line(v22b, v33b);

    const intersects: boolean = line1.intersects(line2);

    expect(intersects).toBe(true);
  });

  it('calculates intersection point with another line', () => {
    const line1: I_Line = new Line(v00, v11);

    const v22b: I_Vector = new Vector({ x: 1, y: 0 });
    const v33b: I_Vector = new Vector({ x: 0, y: 1 });
    const line2: I_Line = new Line(v22b, v33b);

    const intersectionPoint: I_Vector = line1.intersectionPoint(line2);
    const correct: I_Vector = new Vector({ x: 0.5, y: 0.5 });

    expect(intersectionPoint).toEqual(correct);
  });

  it('assigns disjoined sets to its points', () => {
    const line: I_Line = new Line(v00, v11);
    line.makeDisjoinedSets();

    expect(line.a.set).toBeInstanceOf(DisjoinedSet);
    expect(line.b.set).toBeInstanceOf(DisjoinedSet);
  });

  it('finds all points from an array of Lines', () => {
    const line1: I_Line = new Line(v00, v11);
    const line2: I_Line = new Line(v22, v33);

    const points: I_Vector[] = Line.PointsFromArray([line1, line2]);
    expect(points).toEqual([v00, v11, v22, v33]);
  });

  it('finds a unique line in an array', () => {
    const line1: I_Line = new Line(v00, v11);
    const line2: I_Line = new Line(v00, v11);
    const line3: I_Line = new Line(v22, v33);

    const lines: I_Line[] = [line1, line2, line3];
    const isLine1Unique: boolean = Line.IsUnique(line1, lines);
    const isLine3Unique: boolean = Line.IsUnique(line3, lines);

    expect(isLine1Unique).toBe(false);
    expect(isLine3Unique).toBe(true);
  });

  it('removes duplicate lines from an array', () => {
    const line1: I_Line = new Line(v00, v11);
    const line2: I_Line = new Line(v00, v11);
    const line3: I_Line = new Line(v22, v33);
    const line4: I_Line = new Line(v22, v33);

    const unique: I_Line[] = Line.RemoveDuplicates([line1, line2, line3, line4]);

    expect(unique).toEqual([line1, line3]);
  });
});
