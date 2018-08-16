import { isOdd, isEven, isNumeric } from '../../src/util';

describe('util / number', () => {
  it('should know an odd number', () => {
    expect(isOdd(3)).toBe(true);
    expect(isOdd(4)).toBe(false);
  });

  it('should know an even number', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(3)).toBe(false);
  });

  it('should know if a value is numeric', () => {
    expect(isNumeric(4)).toBe(true);
    expect(isNumeric(NaN)).toBe(false);
    expect(isNumeric(Infinity)).toBe(false);
  });
});
