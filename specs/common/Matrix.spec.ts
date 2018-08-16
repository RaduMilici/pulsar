import { Matrix2, Matrix3, Matrix4 } from '../../src/common';

describe('common / Matrix2', () => {
  it('should correctly determine', () => {
    const m: Matrix2 = new Matrix2(1, 2, 3, 4);

    expect(m.determine()).toBe(-2);
  });
});

describe('common / Matrix3', () => {
  it('should correctly determine', () => {
    const m: Matrix3 = new Matrix3(5, 4, 3, 2, 1, 6, 7, 8, 9);

    expect(m.determine()).toBe(-72);
  });
});

describe('common / Matrix4', () => {
  it('should correctly determine', () => {
    const m: Matrix4 = new Matrix4(
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
      3
    );

    expect(m.determine()).toBe(-594);
  });
});
