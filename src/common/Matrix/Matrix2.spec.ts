import Matrix2 from './Matrix2';

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
});
