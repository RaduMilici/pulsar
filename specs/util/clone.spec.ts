import { Vector } from '../../src/common';
import { cloneObject, cloneObjectArray } from '../../src/util/clone';

describe('util / clone', () => {
  it('should deep clone an object', () => {
    const v: Vector = new Vector();
    const clone: Vector = cloneObject(v);

    expect(v).toEqual(clone);
    expect(v).not.toBe(clone);
  });

  it('should deep clone an array of objects', () => {
    const v1: Vector = new Vector();
    const v2: Vector = new Vector();
    const v3: Vector = new Vector();
    const vectors: Vector[] = [v1, v2, v3];
    const clones: Vector[] = cloneObjectArray(vectors);

    expect(vectors).toEqual(clones);
    expect(vectors).not.toBe(clones);
  });
});
