import Vector from './Vector';
import I_Vector from './I_Vector';

describe('common / Vector', () => {
  it('clones itself', () => {
    const vector: I_Vector = new Vector();
    const clone: I_Vector = vector.clone();

    expect(vector).toEqual(clone);
  });

  it('calculates magnitude', () => {
    const vector: I_Vector = new Vector({ x: 1, y: 1 });
    const magnitude: number = vector.magnitude();

    expect(magnitude).toBeCloseTo(1.41, 2);
  });

  it('calculates dot product', () => {
    const a: I_Vector = new Vector({ x: 2, y: 3 });
    const b: I_Vector = new Vector({ x: 3, y: 2 });
    const dotProduct: number = a.dotProduct(b);

    expect(dotProduct).toEqual(12);
  });

  it('can add other Vectors', () => {
    const a: I_Vector = new Vector({ x: 2, y: 3 });
    const b: I_Vector = new Vector({ x: 3, y: 2 });
    const added: I_Vector = a.add(b);
    const correct: I_Vector = new Vector({ x: 5, y: 5 });

    expect(added).toEqual(correct);
  });

  it('can subtract other Vectors', () => {
    const a: I_Vector = new Vector({ x: 2, y: 3 });
    const b: I_Vector = new Vector({ x: 3, y: 2 });
    const subtracted: I_Vector = a.sub(b);
    const correct: I_Vector = new Vector({ x: -1, y: 1 });

    expect(subtracted).toEqual(correct);
  });

  it('normalizes into a new Vector', () => {
    const a: I_Vector = new Vector({ x: 2, y: 3 });
    const normalized: I_Vector = a.normalize();
    const correct: I_Vector = new Vector({ x: 0.55, y: 0.83 });

    expect(normalized.x).toBeCloseTo(correct.x, 2);
    expect(normalized.y).toBeCloseTo(correct.y, 2);
  });

  it('negates into a new Vector', () => {
    const a: I_Vector = new Vector({ x: 2, y: 3 });
    const negative: I_Vector = a.negative();
    const correct: I_Vector = new Vector({ x: -2, y: -3 });

    expect(negative).toEqual(correct);
  });

  it('calculates a new negative Vector', () => {
    const a: I_Vector = new Vector({ x: 2, y: 3 });
    const negative: I_Vector = a.negative();
    const correct: I_Vector = new Vector({ x: -2, y: -3 });

    expect(negative).toEqual(correct);
  });

  it('calculates two new left and right perpendicular Vectors', () => {
    type leftRight = { left: I_Vector; right: I_Vector };
    const a: I_Vector = new Vector({ x: 2, y: 3 });
    const perpendicular: leftRight = a.perpendicular();
    const correct: leftRight = {
      left: new Vector({ x: 3, y: -2 }),
      right: new Vector({ x: -3, y: 2 }),
    };

    expect(perpendicular).toEqual(correct);
  });

  it('scales into a new Vector', () => {
    const a: I_Vector = new Vector({ x: 1, y: 1 });
    const scaled: I_Vector = a.scale(10);
    const correct: I_Vector = new Vector({ x: 7.1, y: 7.1 });

    expect(scaled.x).toBeCloseTo(correct.x, 1);
    expect(scaled.y).toBeCloseTo(correct.y, 1);
  });

  it('calculates angle to another Vector in degrees', () => {
    const a: I_Vector = new Vector({ x: 1, y: 0 });
    const b: I_Vector = new Vector({ x: 0, y: 1 });
    const angle: number = a.angleDeg(b);
    const correct: number = 90;

    expect(angle).toEqual(correct);
  });

  it('calculates angle to another Vector in radians', () => {
    const a: I_Vector = new Vector({ x: 1, y: 0 });
    const b: I_Vector = new Vector({ x: 0, y: 1 });
    const angle: number = a.angleRad(b);
    const correct: number = 1.57;

    expect(angle).toBeCloseTo(correct, 2);
  });

  it('calculates a new bisector Vector', () => {
    const a: I_Vector = new Vector({ x: 0, y: 1 });
    const b: I_Vector = new Vector({ x: 1, y: 0 });
    const correct: I_Vector = new Vector({ x: 0.71, y: 0.71 });
    const bisector: I_Vector = a.bisector(b);

    expect(bisector.x).toBeCloseTo(correct.x, 2);
    expect(bisector.y).toBeCloseTo(correct.y, 2);
  });

  it('checks equality to another Vector', () => {
    const a: I_Vector = new Vector({ x: 0, y: 1 });
    const b: I_Vector = new Vector({ x: 0, y: 1 });
    const equals: boolean = a.equals(b);

    expect(equals).toBe(true);
  });

  it('finds a midpoint to another Vector', () => {
    const a: I_Vector = new Vector({ x: 1, y: 1 });
    const b: I_Vector = new Vector({ x: 2, y: 2 });
    const correct: I_Vector = new Vector({ x: 1.5, y: 1.5 });
    const midpoint: I_Vector = a.midpoint(b);

    expect(midpoint).toEqual(correct);
  });

  it('finds centroid', () => {
    const a: I_Vector = new Vector({ x: 0, y: 0 });
    const b: I_Vector = new Vector({ x: 0, y: 1 });
    const c: I_Vector = new Vector({ x: 1, y: 1 });
    const d: I_Vector = new Vector({ x: 1, y: 0 });
    const correct: I_Vector = new Vector({ x: 0.5, y: 0.5 });
    const centroid: I_Vector = Vector.FindPolyCentroid([a, b, c, d]);

    expect(centroid).toEqual(correct);
  });

  it('arranges points counterclockwise', () => {
    const a: I_Vector = new Vector({ x: 0, y: 0 });
    const b: I_Vector = new Vector({ x: 0, y: 1 });
    const c: I_Vector = new Vector({ x: 1, y: 1 });
    const d: I_Vector = new Vector({ x: 1, y: 0 });
    const correct: I_Vector[] = [a, d, c, b];
    const ccw: I_Vector[] = Vector.ArrangePointsCCW([a, b, c, d]);

    expect(ccw).toEqual(correct);
  });

  it('filters unique points from an array', () => {
    const a: I_Vector = new Vector({ x: 0, y: 0 });
    const b: I_Vector = new Vector({ x: 0, y: 0 });
    const c: I_Vector = new Vector({ x: 1, y: 1 });
    const d: I_Vector = new Vector({ x: 1, y: 1 });
    const correct: I_Vector[] = [a, c];
    const unique: I_Vector[] = Vector.UniqueFromArray([a, b, c, d]);

    expect(unique).toEqual(correct);
  });
});
