import LineIntersection from './LineIntersection';
import Vector from '../Vector';
import { ab, fd, ed, da } from '../../../specs/common/fixtures/Lines';
import { Line } from '../Line';

describe('common / LineIntersection', () => {
    test('lines intersect', () => {
        const line1 = new Line(new Vector({ x: 0, y: 0 }), new Vector({ x: 10, y: 10 }));
        const line2 = new Line(new Vector({ x: 0, y: 10 }), new Vector({ x: 10, y: 0 }));
        const intersection = new LineIntersection(line1, line2);

        expect(intersection.intersects).toBe(true);
    });

    test('lines do not intersect', () => {
        const line1 = new Line(new Vector({ x: 0, y: 0 }), new Vector({ x: 10, y: 10 }));
        const line2 = new Line(new Vector({ x: 0, y: 10 }), new Vector({ x: 10, y: 20 }));
        const intersection = new LineIntersection(line1, line2);

        expect(intersection.intersects).toBe(false);
    });

    test('should know its intersection point', () => {
        const line1 = new Line(new Vector({ x: 0, y: 0 }), new Vector({ x: 1, y: 1 }));
        const line2 = new Line(new Vector({ x: 0, y: 1 }), new Vector({ x: 1, y: 0 }));
        const intersection: LineIntersection = new LineIntersection(line1, line2);

        expect(intersection.point).toEqual(new Vector({ x: 0.5, y: 0.5 }));
    });

    test('point on the left edge is considered inside', () => {
        const line1 = new Line(new Vector({ x: 0, y: 0 }), new Vector({ x: 0, y: 10 }));
        const line2 = new Line(new Vector({ x: 0, y: 5 }), new Vector({ x: 10, y: 5 }));
        const intersection = new LineIntersection(line1, line2);

        expect(intersection.intersects).toBe(true);
    });

    test('point on the top edge is considered inside', () => {
        const line1 = new Line(new Vector({ x: 0, y: 10 }), new Vector({ x: 10, y: 10 }));
        const line2 = new Line(new Vector({ x: 5, y: 0 }), new Vector({ x: 5, y: 10 }));
        const intersection = new LineIntersection(line1, line2);
        expect(intersection.intersects).toBe(true);
    });

    test('point on the right edge is considered inside', () => {
        const line1 = new Line(new Vector({ x: 10, y: 0 }), new Vector({ x: 10, y: 10 }));
        const line2 = new Line(new Vector({ x: 0, y: 5 }), new Vector({ x: 10, y: 5 }));
        const intersection = new LineIntersection(line1, line2);
        expect(intersection.intersects).toBe(true);
    });

    test('point on the bottom edge is considered inside', () => {
        const line1 = new Line(new Vector({ x: 0, y: 0 }), new Vector({ x: 10, y: 0 }));
        const line2 = new Line(new Vector({ x: 5, y: 0 }), new Vector({ x: 5, y: 10 }));
        const intersection = new LineIntersection(line1, line2);
        expect(intersection.intersects).toBe(true);
    });
});
