import { RadToDeg, DegToRad } from '../../src/util/radDeg';

describe('util / radDeg', () => {
  it('should convert radians to degrees', () => {
    expect(RadToDeg(7)).toBeCloseTo(401.07, 2);
  });

  it('should convert degrees to radians', () => {
    expect(DegToRad(500)).toBeCloseTo(8.73, 2);
  });
});
