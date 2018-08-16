import { Matrix2, Vector } from '../common';
import { isNumeric } from '../util/number';
// https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
export default class LineIntersection {
    constructor(line1, line2) {
        this.line1 = line1;
        this.line2 = line2;
        // points
        this.x1 = this.line1.a.x;
        this.y1 = this.line1.a.y;
        this.x2 = this.line1.b.x;
        this.y2 = this.line1.b.y;
        this.x3 = this.line2.a.x;
        this.y3 = this.line2.a.y;
        this.x4 = this.line2.b.x;
        this.y4 = this.line2.b.y;
        // shared matrices
        const e = new Matrix2(this.x1, 1, this.x2, 1);
        const f = new Matrix2(this.y1, 1, this.y2, 1);
        const g = new Matrix2(this.x3, 1, this.x4, 1);
        const h = new Matrix2(this.y3, 1, this.y4, 1);
        const efgh = new Matrix2(e.determine(), f.determine(), g.determine(), h.determine());
        this.efghDeterminant = efgh.determine();
    }
    get intersects() {
        const areValidCoords = isNumeric(this.point.x) && isNumeric(this.point.y);
        return areValidCoords && this.isOnSegments();
    }
    get point() {
        const x = this.getX();
        const y = this.getY();
        return new Vector({ x, y });
    }
    getX() {
        const a = new Matrix2(this.x1, this.y1, this.x2, this.y2);
        const b = new Matrix2(this.x1, 1, this.x2, 1);
        const c = new Matrix2(this.x3, this.y3, this.x4, this.y4);
        const d = new Matrix2(this.x3, 1, this.x4, 1);
        const abcd = new Matrix2(a.determine(), b.determine(), c.determine(), d.determine());
        return abcd.determine() / this.efghDeterminant;
    }
    getY() {
        const a = new Matrix2(this.x1, this.y1, this.x2, this.y2);
        const b = new Matrix2(this.y1, 1, this.y2, 1);
        const c = new Matrix2(this.x3, this.y3, this.x4, this.y4);
        const d = new Matrix2(this.y3, 1, this.y4, 1);
        const abcd = new Matrix2(a.determine(), b.determine(), c.determine(), d.determine());
        return abcd.determine() / this.efghDeterminant;
    }
    isOnSegments() {
        const a = new Matrix2(this.x1 - this.x3, this.x3 - this.x4, this.y1 - this.y3, this.y3 - this.y4);
        const b = new Matrix2(this.x1 - this.x2, this.x3 - this.x4, this.y1 - this.y2, this.y3 - this.y4);
        const c = new Matrix2(this.x1 - this.x2, this.x1 - this.x3, this.y1 - this.y2, this.y1 - this.y3);
        const d = new Matrix2(this.x1 - this.x2, this.x3 - this.x4, this.y1 - this.y2, this.y3 - this.y4);
        const divisionAB = a.determine() / b.determine();
        const divisionCD = -(c.determine() / d.determine());
        const isOnSegmentA = divisionAB >= 0 && divisionAB <= 1;
        const isOnSegmentB = divisionCD >= 0 && divisionCD <= 1;
        return isOnSegmentA && isOnSegmentB;
    }
}
//# sourceMappingURL=LineIntersection.js.map