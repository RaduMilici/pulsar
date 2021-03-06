import Vector from '../Vector';
import BoundingBox from './BoundingBox';
import { v00, v01, v11, v10, v33 } from '../../../specs/common/fixtures/Vectors';
import { ae, ed, da, af } from '../../../specs/common/fixtures/Lines';
import { limits, boundingBoxLines } from '../../interfaces';

describe('common / BoundingBox', () => {
  it('should find its four corners', () => {
    const box: BoundingBox = new BoundingBox([v00, v01, v11, v10]);

    expect(box.topLeft).toEqual(v01);
    expect(box.topRight).toEqual(v11);
    expect(box.bottomLeft).toEqual(v00);
    expect(box.bottomRight).toEqual(v10);
  });

  it('should find its four bounding lines', () => {
    const box: BoundingBox = new BoundingBox([v00, v01, v11, v10]);
    const correct: boundingBoxLines = {
      top: ae,
      right: ed,
      bottom: da,
      left: af,
    };

    expect(box.lines).toMatchObject(correct);
  });

  it('should find its limits', () => {
    const box: BoundingBox = new BoundingBox([v00, v01, v11, v10]);
    const correct: limits = {
      left: new Vector({ x: 0, y: 0.5 }),
      right: new Vector({ x: 1, y: 0.5 }),
      top: new Vector({ x: 0.5, y: 1 }),
      bottom: new Vector({ x: 0.5, y: 0 }),
    };

    expect(box.midpoints).toEqual(correct);
    expect(box.limits).toEqual(correct);
  });

  it('should know its area', () => {
    const box: BoundingBox = new BoundingBox([v00, v01, v33, v10]);

    expect(box.area).toBe(9);
  });
});
