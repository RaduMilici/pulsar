import { Matrix2, Matrix3, Matrix4 } from '../../src/common';

describe('common / Matrix2', () => {
  let m: Matrix2;

  beforeEach(() => {
    m = new Matrix2(1, 2, 3, 4);
  });

  it('defaults to a zero matrix when missing arguments', () => {
    const mZero = new Matrix2();
    expect(mZero.elements).toEqual([0, 0, 0, 0]);
  });

  it('returns its elements', () => {
    expect(m.elements).toEqual([1, 2, 3, 4]);
  });

  it('should correctly determine', () => {
    expect(m.determine()).toBe(-2);
  });

  it('should multiply a scalar', () => {
    expect(m.multiplyScalar(9)).toEqual(new Matrix2(9, 18, 27, 36));
  });
});

describe('common / Matrix3', () => {
  let m: Matrix3;

  beforeEach(() => {
    m = new Matrix3(5, 4, 3, 2, 1, 6, 7, 8, 9);
  });

  it('defaults to a zero matrix when missing arguments', () => {
    const mZero = new Matrix3();
    expect(mZero.elements).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('returns its elements', () => {
    expect(m.elements).toEqual([5, 4, 3, 2, 1, 6, 7, 8, 9]);
  });

  it('should correctly determine', () => {
    expect(m.determine()).toBe(-72);
  });

  it('should multiply a scalar', () => {
    expect(m.multiplyScalar(29)).toEqual(
      new Matrix3(145, 116, 87, 58, 29, 174, 203, 232, 261)
    );
  });
});

describe('common / Matrix4', () => {
  let m: Matrix4;

  beforeEach(() => {
    m = new Matrix4(5, 4, 3, 2, 1, 6, 7, 8, 9, 5, 2, 8, 9, 1, 0, 3);
  });

  it('defaults to a zero matrix when missing arguments', () => {
    const mZero = new Matrix4();
    expect(mZero.elements).toEqual([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ]);
  });

  it('returns its elements', () => {
    expect(m.elements).toEqual([
      5,
      4,
      3,
      2,
      1,
      6,
      7,
      8,
      9,
      5,
      2,
      8,
      9,
      1,
      0,
      3,
    ]);
  });

  it('should correctly determine', () => {
    expect(m.determine()).toBe(-594);
  });

  it('should multiply a scalar', () => {
    expect(m.multiplyScalar(29)).toEqual(
      new Matrix4(
        145,
        116,
        87,
        58,
        29,
        174,
        203,
        232,
        261,
        145,
        58,
        232,
        261,
        29,
        0,
        87
      )
    );
  });
});
