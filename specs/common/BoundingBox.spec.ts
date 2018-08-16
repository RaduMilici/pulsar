import { BoundingBox, Line, Vector } from '../../src/common';
import { v00, v01, v11, v10, v33 } from './fixtures/Vectors';
import { ad, de, ef, fa } from './fixtures/Lines';
import limits from '../../src/interfaces/limits';

describe('BoundingBox', () => {
  it('should find its four corners', () => {
    const box: BoundingBox = new BoundingBox([v00, v01, v11, v10]);

    expect(box.topLeft).toEqual(v00);
    expect(box.topRight).toEqual(v10);
    expect(box.bottomLeft).toEqual(v01);
    expect(box.bottomRight).toEqual(v11);
  });

  it('should find its four bounding lines', () => {
    const box: BoundingBox = new BoundingBox([v00, v01, v11, v10]);
    const correct: Line[] = [ad, de, ef, fa];

    expect(box.lines).toMatchObject(correct);
  });

  it('should find its limits', () => {
    const box: BoundingBox = new BoundingBox([v00, v01, v11, v10]);
    const correct: limits = {
      left: new Vector({ x: 0, y: 0.5 }),
      right: new Vector({ x: 1, y: 0.5 }),
      top: new Vector({ x: 0.5, y: 0 }),
      bottom: new Vector({ x: 0.5, y: 1 }),
    };

    expect(box.midpoints).toEqual(correct);
    expect(box.limits).toEqual(correct);
  });

  it('should know its area', () => {
    const box: BoundingBox = new BoundingBox([v00, v01, v33, v10]);

    expect(box.area).toBe(9);
  });
});
