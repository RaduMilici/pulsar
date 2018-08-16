import { Vector } from '../../src/common';
import point from '../../src/interfaces/point';

describe('common / Vector', () => {
  it('set x and y with proper float accuracy', () => {
    const { x, y }: point = new Vector({ x: 1.234, y: 3.21 });

    expect({ x, y }).toEqual({ x: 1.23, y: 3.21 });
  });

  it('clones itself', () => {
    const vector: Vector = new Vector();
    const clone: Vector = vector.clone();

    expect(vector).toEqual(clone);
  });

  it('calculates magnitude', () => {
    const vector: Vector = new Vector({ x: 1, y: 1 });
    const magnitude: number = vector.magnitude();

    expect(magnitude).toEqual(1.41);
  });

  it('calculates dot product', () => {
    const a: Vector = new Vector({ x: 2, y: 3 });
    const b: Vector = new Vector({ x: 3, y: 2 });
    const dotProduct: number = a.dotProduct(b);

    expect(dotProduct).toEqual(12);
  });

  it('can add other Vectors', () => {
    const a: Vector = new Vector({ x: 2, y: 3 });
    const b: Vector = new Vector({ x: 3, y: 2 });
    const added: Vector = a.add(b);
    const correct: Vector = new Vector({ x: 5, y: 5 });

    expect(added).toEqual(correct);
  });

  it('can subtract other Vectors', () => {
    const a: Vector = new Vector({ x: 2, y: 3 });
    const b: Vector = new Vector({ x: 3, y: 2 });
    const subtracted: Vector = a.sub(b);
    const correct: Vector = new Vector({ x: -1, y: 1 });

    expect(subtracted).toEqual(correct);
  });

  it('normalizes into a new Vector', () => {
    const a: Vector = new Vector({ x: 2, y: 3 });
    const normalized: Vector = a.normalize();
    const correct: Vector = new Vector({ x: 0.55, y: 0.83 });

    expect(normalized).toEqual(correct);
  });

  it('negates into a new Vector', () => {
    const a: Vector = new Vector({ x: 2, y: 3 });
    const negative: Vector = a.negative();
    const correct: Vector = new Vector({ x: -2, y: -3 });

    expect(negative).toEqual(correct);
  });

  it('calculates a new negative Vector', () => {
    const a: Vector = new Vector({ x: 2, y: 3 });
    const negative: Vector = a.negative();
    const correct: Vector = new Vector({ x: -2, y: -3 });

    expect(negative).toEqual(correct);
  });

  it('calculates two new left and right perpendicular Vectors', () => {
    type leftRight = { left: Vector; right: Vector };
    const a: Vector = new Vector({ x: 2, y: 3 });
    const perpendicular: leftRight = a.perpendicular();
    const correct: leftRight = {
      left: new Vector({ x: 3, y: -2 }),
      right: new Vector({ x: -3, y: 2 }),
    };

    expect(perpendicular).toEqual(correct);
  });

  it('scales into a new Vector', () => {
    const a: Vector = new Vector({ x: 1, y: 1 });
    const scaled: Vector = a.scale(10);
    const correct: Vector = new Vector({ x: 7.1, y: 7.1 });

    expect(scaled).toEqual(correct);
  });

  it('calculates angle to another Vector in degrees', () => {
    const a: Vector = new Vector({ x: 1, y: 0 });
    const b: Vector = new Vector({ x: 0, y: 1 });
    const angle: number = a.angleDeg(b);
    const correct: number = 90;

    expect(angle).toEqual(correct);
  });

  it('calculates angle to another Vector in radians', () => {
    const a: Vector = new Vector({ x: 1, y: 0 });
    const b: Vector = new Vector({ x: 0, y: 1 });
    const angle: number = a.angleRad(b);
    const correct: number = 1.57;

    expect(angle).toEqual(correct);
  });

  it('calculates a new bisector Vector', () => {
    const a: Vector = new Vector({ x: 0, y: 1 });
    const b: Vector = new Vector({ x: 1, y: 0 });
    const correct: Vector = new Vector({ x: 0.71, y: 0.71 });
    const bisector: Vector = a.bisector(b);

    expect(bisector).toEqual(correct);
  });

  it('checks equality to another Vector', () => {
    const a: Vector = new Vector({ x: 0, y: 1 });
    const b: Vector = new Vector({ x: 0, y: 1 });
    const equals: boolean = a.equals(b);

    expect(equals).toBe(true);
  });

  it('finds a midpoint to another Vector', () => {
    const a: Vector = new Vector({ x: 1, y: 1 });
    const b: Vector = new Vector({ x: 2, y: 2 });
    const correct: Vector = new Vector({ x: 1.5, y: 1.5 });
    const midpoint: Vector = a.midpoint(b);

    expect(midpoint).toEqual(correct);
  });

  it('finds centroid', () => {
    const a: Vector = new Vector({ x: 0, y: 0 });
    const b: Vector = new Vector({ x: 0, y: 1 });
    const c: Vector = new Vector({ x: 1, y: 1 });
    const d: Vector = new Vector({ x: 1, y: 0 });
    const correct: Vector = new Vector({ x: 0.5, y: 0.5 });
    const centroid: Vector = Vector.FindPolyCentroid([a, b, c, d]);

    expect(centroid).toEqual(correct);
  });

  it('arranges points counterclockwise', () => {
    const a: Vector = new Vector({ x: 0, y: 0 });
    const b: Vector = new Vector({ x: 0, y: 1 });
    const c: Vector = new Vector({ x: 1, y: 1 });
    const d: Vector = new Vector({ x: 1, y: 0 });
    const correct: Vector[] = [a, d, c, b];
    const ccw: Vector[] = Vector.ArrangePointsCCW([a, b, c, d]);

    expect(ccw).toEqual(correct);
  });

  it('filters unique points from an array', () => {
    const a: Vector = new Vector({ x: 0, y: 0 });
    const b: Vector = new Vector({ x: 0, y: 0 });
    const c: Vector = new Vector({ x: 1, y: 1 });
    const d: Vector = new Vector({ x: 1, y: 1 });
    const correct: Vector[] = [a, c];
    const unique: Vector[] = Vector.UniqueFromArray([a, b, c, d]);

    expect(unique).toEqual(correct);
  });
});
