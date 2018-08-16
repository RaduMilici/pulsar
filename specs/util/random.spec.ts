import { int, float } from '../../src/util/random';

describe('util / random', () => {
  it('should generate a random int', () => {
    const n: number = int(0, 10);

    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThanOrEqual(10);
    expect(Number.isInteger(n)).toBe(true);
  });

  it('should generate a random float', () => {
    const n: number = float(0, 10);

    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThanOrEqual(10);
    expect(Number.isInteger(n)).toBe(false);
  });
});
