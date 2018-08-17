import { randomInt, randomFloat } from '../../src/util';

describe('util / random', () => {
  it('should generate a random randomInt', () => {
    const n: number = randomInt(0, 10);

    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThanOrEqual(10);
    expect(Number.isInteger(n)).toBe(true);
  });

  it('should generate a random randomFloat', () => {
    const n: number = randomFloat(0, 10);

    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThanOrEqual(10);
    expect(Number.isInteger(n)).toBe(false);
  });
});
