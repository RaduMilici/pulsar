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

  it('should add with another Matrix2', () => {
    const m2: Matrix2 = new Matrix2(4, 3, 2, 1);
    expect(m.add(m2)).toEqual(new Matrix2(5, 5, 5, 5));
  });

  it('should multiply a scalar', () => {
    expect(m.multiplyScalar(9)).toEqual(new Matrix2(9, 18, 27, 36));
  });

  it('should mutiply with another Matrix2', () => {
    const m2 = new Matrix2(4, 3, 2, 1);
    expect(m.multiply(m2)).toEqual(new Matrix2(8, 5, 20, 13));
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

  it('should add with another Matrix3', () => {
    const m3: Matrix3 = new Matrix3(4, 3, 2, 1, 1, 2, 3, 4, 5);
    expect(m.add(m3)).toEqual(new Matrix3(9, 7, 5, 3, 2, 8, 10, 12, 14));
  });

  it('should multiply a scalar', () => {
    expect(m.multiplyScalar(29)).toEqual(
      new Matrix3(145, 116, 87, 58, 29, 174, 203, 232, 261)
    );
  });

  it('should mutiply with another Matrix3', () => {
    const m3 = new Matrix3(4, 3, 2, 1, 2, 3, 4, 5, 6);
    expect(m.multiply(m3)).toEqual(new Matrix3(36, 38, 40, 33, 38, 43, 72, 82, 92));
  });
});

describe('common / Matrix4', () => {
  let m: Matrix4;

  beforeEach(() => {
    m = new Matrix4(5, 4, 3, 2, 1, 6, 7, 8, 9, 5, 2, 8, 9, 1, 0, 3);
  });

  it('defaults to a zero matrix when missing arguments', () => {
    const mZero = new Matrix4();
    expect(mZero.elements).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('returns its elements', () => {
    expect(m.elements).toEqual([5, 4, 3, 2, 1, 6, 7, 8, 9, 5, 2, 8, 9, 1, 0, 3]);
  });

  it('should correctly determine', () => {
    expect(m.determine()).toBe(-594);
  });

  it('should add with another Matrix4', () => {
    const m4: Matrix4 = new Matrix4(4, 3, 2, 1, 1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4);
    expect(m.add(m4)).toEqual(
      new Matrix4(9, 7, 5, 3, 2, 8, 10, 12, 14, 9, 5, 10, 10, 3, 3, 7)
    );
  });

  it('should multiply a scalar', () => {
    expect(m.multiplyScalar(29)).toEqual(
      new Matrix4(145, 116, 87, 58, 29, 174, 203, 232, 261, 145, 58, 232, 261, 29, 0, 87)
    );
  });

  it('should mutiply with another Matrix4', () => {
    const m4 = new Matrix4(4, 3, 2, 1, 2, 3, 4, 5, 6, 9, 8, 5, 4, 6, 8, 1);
    expect(m.multiply(m4)).toEqual(
      new Matrix4(54, 66, 66, 42, 90, 132, 146, 74, 90, 108, 118, 52, 50, 48, 46, 17)
    );
  });

  it('should mutiply with another Matrix4', () => {
    const m1: Matrix4 = new Matrix4(
      0.004,
      0,
      0,
      0,
      0,
      -0.004,
      0,
      0,
      0,
      0,
      0.01,
      0,
      -1,
      1,
      0,
      1
    );
    const m2: Matrix4 = new Matrix4(
      0.9999999968000002,
      0,
      -0.00007999999789369669,
      0,
      0,
      1,
      0,
      0,
      0.00007999999789369669,
      0,
      0.9999999968000002,
      0,
      0,
      0,
      0,
      1
    );
    expect(m1.multiply(m2)).toEqual(
      new Matrix4(
        0.0039999999872000008,
        0,
        -0.00000031999999157478676,
        0,
        0,
        -0.004,
        0,
        0,
        0.0000007999999789369669,
        0,
        0.009999999968000002,
        0,
        -0.9999999968000002,
        1,
        0.00007999999789369669,
        1
      )
    );
  });
});
