import Matrix2 from './Matrix2';
import Matrix3 from './Matrix3';
import Matrix4 from './Matrix4';

describe('common / Matrix', () => {
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

    it('should multiply with another Matrix2', () => {
      const m2 = new Matrix2(5, 6, 7, 8);
      expect(m.multiply(m2)).toEqual(new Matrix2(23, 34, 31, 46));
    });

    it('inverts a Matrix2 to integers', () => {
      const m = new Matrix2(7, 17, 2, 5);
      expect(m.invert()).toEqual(new Matrix2(5, -17, -2, 7));
    });

    it('inverts a Matrix2 to floats', () => {
      const m = new Matrix2(29, 19, 5, 89);
      expect(m.invert()).toEqual(
        new Matrix2(
          0.03580048270313757,
          -0.007642799678197908,
          -0.0020112630732099755,
          0.011665325824617859
        )
      );
    });

    it('returns a zero matrix when determinant is zero', () => {
      const m = new Matrix2(1, 3, 3, 9);
      expect(m.invert()).toEqual(new Matrix2());
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

    it('should multiply with another Matrix3', () => {
      const m3 = new Matrix3(4, 3, 2, 1, 2, 3, 4, 5, 6);
      expect(m.multiply(m3)).toEqual(new Matrix3(40, 35, 48, 30, 30, 42, 72, 69, 96));
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

    it('should multiply with another Matrix4', () => {
      const m4 = new Matrix4(4, 3, 2, 1, 2, 3, 4, 5, 6, 9, 8, 5, 4, 6, 8, 1);
      expect(m.multiply(m4)).toEqual(
        new Matrix4(50, 45, 37, 51, 94, 51, 35, 75, 156, 123, 97, 163, 107, 93, 70, 123)
      );
    });

    it('should multiply with another Matrix4', () => {
      const m1: Matrix4 = new Matrix4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
      const m2: Matrix4 = new Matrix4(
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32
      );
      expect(m1.multiply(m2)).toEqual(
        new Matrix4(
          538,
          612,
          686,
          760,
          650,
          740,
          830,
          920,
          762,
          868,
          974,
          1080,
          874,
          996,
          1118,
          1240
        )
      );
    });
  });
});
