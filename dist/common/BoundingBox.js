import Vector from './Vector';
import Line from './Line';
import { immutableObjectSort } from '../util/sort';
export default class BoundingBox {
    constructor(points) {
        this.points = points;
        this.findCorners();
        this.lines = this.makeLines();
        this.limits = this.getLimits();
    }
    get midpoints() {
        return this.limits;
    }
    get area() {
        return this.topRight.x - this.topLeft.x;
    }
    findCorners() {
        const sortedX = immutableObjectSort(this.points, 'x');
        const sortedY = immutableObjectSort(this.points, 'y');
        const firstX = sortedX[0];
        const firstY = sortedY[0];
        const lastX = sortedX[sortedX.length - 1];
        const lastY = sortedY[sortedY.length - 1];
        this.topLeft = new Vector({ x: firstX.x, y: firstY.y });
        this.topRight = new Vector({ x: lastX.x, y: firstY.y });
        this.bottomRight = new Vector({ x: lastX.x, y: lastY.y });
        this.bottomLeft = new Vector({ x: firstX.x, y: lastY.y });
    }
    makeLines() {
        const top = new Line(this.topLeft, this.topRight);
        const right = new Line(this.topRight, this.bottomRight);
        const bottom = new Line(this.bottomRight, this.bottomLeft);
        const left = new Line(this.bottomLeft, this.topLeft);
        return [top, right, bottom, left];
    }
    getLimits() {
        const top = this.topLeft.midpoint(this.topRight);
        const bottom = this.bottomLeft.midpoint(this.bottomRight);
        const left = this.topLeft.midpoint(this.bottomLeft);
        const right = this.topRight.midpoint(this.bottomRight);
        return { top, bottom, left, right };
    }
}
//# sourceMappingURL=BoundingBox.js.map