import { uniqueId } from '../../src/util';

describe('until / uniqueId', () => {
  it('should generate an incrementing unique id', () => {
    const count: number = 100000;
    const ids: string[] = [];

    for (let i = 0; i < count; i++) {
      ids.push(uniqueId());
    }

    const set: Set<string> = new Set(ids);
    expect([...set].length).toBe(ids.length);
  });
});
