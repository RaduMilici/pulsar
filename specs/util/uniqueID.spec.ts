import uniqueId from '../../src/util/uniqueID';

describe('until / uniqueId', () => {
  it('should generate an incrementing unique id', () => {
    const count: number = 100000;
    const ids: string[] = [];

    for (let i = 0; i < count; i++) {
      const id: string = uniqueId();
      ids.push(id);
    }

    const set: Set<string> = new Set(ids);
    expect([...set].length).toBe(ids.length);
  });
});
