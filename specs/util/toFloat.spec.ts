import { toFloat } from '../../src/util';

describe('util / toFloat', () => {
  it('should reduce a float to two decimals', () => {
    const PI: number = toFloat(Math.PI);
    expect(PI.toString().length).toBe(4);
  });
});
