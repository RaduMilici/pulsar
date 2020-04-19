import Vector from './Vector';
import Line from './Line';
import BoundingBox from './BoundingBox';
import { isOdd } from '../util';
export default class Shape {
    constructor(points) {
        this.points = points;
        this.lines = Shape.makeLines(points);
        this.boundingBox = new BoundingBox(points);
    }
    containsPoint(point) {
        let intersects = 0;
        const checkPoint = new Vector({
            x: point.x,
            y: Number.MAX_SAFE_INTEGER,
        });
        const checkLine = new Line(point, checkPoint);
        this.lines.forEach((line) => {
            if (line.intersects(checkLine)) {
                intersects++;
            }
        });
        return isOdd(intersects);
    }
    get centroid() {
        return Vector.FindPolyCentroid(this.points);
    }
    static makeLines(points) {
        const lines = [];
        const ccwPoints = Vector.ArrangePointsCCW(points);
        for (let i = 1; i < ccwPoints.length; i++) {
            const a = ccwPoints[i - 1];
            const b = ccwPoints[i];
            const ab = new Line(a, b);
            lines.push(ab);
        }
        const firstPoint = ccwPoints[0];
        const lastPoint = ccwPoints[ccwPoints.length - 1];
        const closingLine = new Line(firstPoint, lastPoint);
        lines.push(closingLine);
        return lines;
    }
}
//# sourceMappingURL=Shape.js.map