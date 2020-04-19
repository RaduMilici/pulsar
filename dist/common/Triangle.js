import Vector from './Vector';
import Line from './Line';
import { uniqueId } from '../util';
import { Matrix4 } from './Matrix';
export default class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.id = uniqueId();
        const ab = new Line(a, b);
        const bc = new Line(b, c);
        const ca = new Line(c, a);
        this.lines = { ab, bc, ca };
    }
    get centroid() {
        return Vector.FindPolyCentroid(this.points);
    }
    get points() {
        return [this.a, this.b, this.c];
    }
    get linesArray() {
        return [this.lines.ab, this.lines.bc, this.lines.ca];
    }
    equals(triangle) {
        const { ab, bc, ca } = this.lines;
        const sameAB = ab.equals(triangle.lines.ab) ||
            ab.equals(triangle.lines.bc) ||
            ab.equals(triangle.lines.ca);
        const sameBC = bc.equals(triangle.lines.ab) ||
            bc.equals(triangle.lines.bc) ||
            bc.equals(triangle.lines.ca);
        const sameCA = ca.equals(triangle.lines.ab) ||
            ca.equals(triangle.lines.bc) ||
            ca.equals(triangle.lines.ca);
        return sameAB && sameBC && sameCA;
    }
    isPointInCircumcircle(point) {
        const ax = this.a.x;
        const ay = this.a.y;
        const bx = this.b.x;
        const by = this.b.y;
        const cx = this.c.x;
        const cy = this.c.y;
        const a = ax;
        const b = ay;
        const c = ax * ax + ay * ay;
        const d = 1;
        const e = bx;
        const f = by;
        const g = bx * bx + by * by;
        const h = 1;
        const i = cx;
        const j = cy;
        const k = cx * cx + cy * cy;
        const l = 1;
        const m = point.x;
        const n = point.y;
        const o = point.x * point.x + point.y * point.y;
        const p = 1;
        const matrix = new Matrix4(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
        return matrix.determine() < 0;
    }
    hasPoint(point) {
        return this.a.equals(point) || this.b.equals(point) || this.c.equals(point);
    }
    hasAnyPoint(points) {
        return (points.filter((point) => {
            return this.hasPoint(point);
        }).length !== 0);
    }
    static LinesFromArray(triangles) {
        return triangles.reduce((accumulator, triangle) => {
            accumulator.push(...triangle.linesArray);
            return accumulator;
        }, []);
    }
    static GetUniqueLines(triangles) {
        const lines = Triangle.LinesFromArray(triangles);
        return lines.filter((line) => Line.IsUnique(line, lines));
    }
}
//# sourceMappingURL=Triangle.js.map