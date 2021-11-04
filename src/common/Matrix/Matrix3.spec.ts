import Matrix3 from './Matrix3';

describe('common / Matrix', () => {
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

    it('inverts a Matrix3', () => {
      const m3 = new Matrix3(0, 2, 1, 0, -1, 1, 1, 3, 4);
      expect(m3.invert()).toEqual(
        new Matrix3(
          -2.333333333333333,
          -1.6666666666666665,
          1,
          0.3333333333333333,
          -0.3333333333333333,
          -0,
          0.3333333333333333,
          0.6666666666666666,
          -0
        )
      );
    });

    it('finds the cofactor', () => {
      const m = new Matrix3(0, 2, 1, 0, -1, 1, 1, 3, 4);
      expect(m.cofactor().elements).toEqual([-7, 1, 1, -5, -1, 2, 3, -0, -0]);

      const m2 = new Matrix3(29, -5, 19, -89, -69, 420, -33, 1, 0);
      expect(m2.cofactor().elements).toEqual([
        -420,
        -13860,
        -2366,
        19,
        627,
        136,
        -789,
        -13871,
        -2446,
      ]);
    });
  });
});
