import { uniqueId } from '../../src/util';

describe('until / uniqueId', () => {
  it('should generate an incrementing unique id', () => {
    const count: number = 50;
    const ids: number[] = [];

    for (let i = 0; i < count; i++) {
      ids.push(uniqueId());
    }

    for (let i = 1; i < count - 1; i++) {
      expect(ids[i]).toBeLessThan(ids[i + 1]);
      expect(ids[i]).toBeGreaterThan(ids[i - 1]);
    }
  });
});
