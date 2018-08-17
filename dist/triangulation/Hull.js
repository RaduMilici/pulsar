import { Vector, Line } from '../common';
export default class Hull {
    constructor({ triangles }) {
        this.lines = [];
        this.triangles = triangles;
    }
    get points() {
        return this._points;
    }
    start() {
        const uniqueLines = Line.GetUniqueLines(this.triangles);
        const uniquePoints = Line.PointsFromArray(uniqueLines);
        const ccwPoints = Vector.ArrangePointsCCW(uniquePoints);
        this._points = Vector.UniqueFromArray(ccwPoints);
        for (let i = 1; i < this._points.length; i++) {
            const line = new Line(this._points[i - 1], this._points[i]);
            this.lines.push(line);
        }
        const closingLine = new Line(this._points[this._points.length - 1], this._points[0]);
        this.lines.push(closingLine);
    }
}
//# sourceMappingURL=Hull.js.map