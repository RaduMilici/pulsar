import Matrix4 from './Matrix4';

describe('common / Matrix', () => {
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

    it('inverts a Matrix4', () => {
      const m3 = new Matrix4(29, -33, 34, 5, -5, 22, 76, 6, -19, 32, -101, 2, 89, 14, 2, 111);
      expect(m3.invert()).toEqual(
        new Matrix4(
          0.19263458033107247,
          0.09815569281990626,
          0.13838075048426635,
          -0.016476293329219214,
          0.10803110732713549,
          0.07722433959784465,
          0.09426365802510757,
          -0.010738999011468112,
          -0.005336929379967659,
          0.004249353835370394,
          -0.008496802985023456,
          0.0001638029716906562,
          -0.16798413777734605,
          -0.0885179830902002,
          -0.12268994954487535,
          0.023571247626285426
        )
      );
    });

    it('finds the cofactor', () => {
      const m = new Matrix4(29, -33, 34, 5, -5, 22, 76, 6, -19, 32, -101, 2, 89, 14, 2, 111);
      expect(m.cofactor()).toEqual(
        new Matrix4(
          -505686,
          -283593,
          14010,
          440976,
          -257669,
          -202722,
          -11155,
          232369,
          -363264,
          -247452,
          22305,
          322074,
          43252,
          28191,
          -430,
          -61877
        )
      );
    });
  });
});
