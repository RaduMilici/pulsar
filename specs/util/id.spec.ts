import { Line } from '../../src/common';
import { v00, v11 } from '../common/fixtures/Vectors';
import { contains, findIndex } from '../../src/util';

/*
 * In this case, we do not import fixtures because
 * we actually need the id.
 * */

describe('util / id', () => {
  it('should know if an array contains an id', () => {
    const l1: Line = new Line(v00, v11);
    const l2: Line = new Line(v00, v11);
    const l3: Line = new Line(v00, v11);
    const l4: Line = new Line(v00, v11);
    const lines: Line[] = [l1, l2, l3];

    expect(contains(lines, l1)).toBe(true);
    expect(contains(lines, l4)).not.toBe(true);
  });

  it("should find an id's index", () => {
    const l1: Line = new Line(v00, v11);
    const l2: Line = new Line(v00, v11);
    const l3: Line = new Line(v00, v11);
    const lines: Line[] = [l1, l2, l3];

    expect(findIndex(lines, l2)).toBe(1);
  });
});
