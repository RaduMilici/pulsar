import { LineIntersection, Vector } from '../../src/common';
import { ab, fd } from './fixtures/Lines';

describe('common / LineIntersection', () => {
  it('should know if two lines intersect', () => {
    const intersection: LineIntersection = new LineIntersection(ab, fd);

    expect(intersection.intersects).toBe(true);
  });

  it('should know its intersection point', () => {
    const intersection: LineIntersection = new LineIntersection(ab, fd);
    const correct: Vector = new Vector({ x: 0.5, y: 0.5 });

    expect(intersection.point).toEqual(correct);
  });
});
