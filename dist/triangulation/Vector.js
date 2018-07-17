export default class Vector {
    constructor({ x, y } = { x: 0, y: 0 }) {
        this.floatPrecision = 2;
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Vector({ x: this.x, y: this.y });
    }
    magnitude() {
        const x = this.x * this.x;
        const y = this.y * this.y;
        const magnitude = Math.sqrt(x + y);
        return Number(magnitude.toFixed(this.floatPrecision));
    }
    dotProduct({ x, y }) {
        return this.x * x + this.y * y;
    }
    add(vector) {
        const x = this.x + vector.x;
        const y = this.y + vector.y;
        return new Vector({ x, y });
    }
    sub(vector) {
        const x = this.x + -vector.x;
        const y = this.y + -vector.y;
        return new Vector({ x, y });
    }
    normalize() {
        const magnitude = this.magnitude();
        const x = this.x / magnitude;
        const y = this.y / magnitude;
        return new Vector({ x, y });
    }
    negative() {
        const x = -this.x;
        const y = -this.y;
        return new Vector({ x, y });
    }
    adjacent() {
        const right = new Vector({ x: -this.y, y: this.x });
        const left = new Vector({ x: this.y, y: -this.x });
        return { left, right };
    }
    scale(length) {
        const normalized = this.normalize();
        const x = normalized.x * length;
        const y = normalized.y * length;
        return new Vector({ x, y });
    }
    angle(vector) {
        const product = this.dotProduct(vector);
        const cosAngle = product / (this.magnitude() * vector.magnitude());
        return Vector.RadToDeg(Math.acos(cosAngle));
    }
    bisector(vector) {
        const normalized = this.normalize();
        const normalizedVector = vector.normalize();
        const sum = normalized.add(normalizedVector);
        const magnitude = (this.magnitude() + vector.magnitude()) / 2;
        return sum.scale(magnitude);
    }
    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }
    static RadToDeg(rad) {
        return rad * (180 / Math.PI);
    }
    static DegToRad(deg) {
        return deg * (Math.PI / 180);
    }
    static FindPolyCentroid(points) {
        let x = 0;
        let y = 0;
        points.forEach((point) => {
            x += point.x;
            y += point.y;
        });
        x /= points.length;
        y /= points.length;
        return new Vector({ x, y });
    }
    static ArrangePointsCCW(points) {
        const centroid = Vector.FindPolyCentroid(points);
        let clone = [...points];
        clone.sort((a, b) => {
            const angleA = Math.atan2(a.y - centroid.y, a.x - centroid.x);
            const angleB = Math.atan2(b.y - centroid.y, b.x - centroid.x);
            return angleA - angleB;
        });
        return clone;
    }
    static UniqueFromArray(points) {
        return points.filter((pointFilter) => {
            return (points.findIndex((pointIndex) => pointFilter.equals(pointIndex)) !== -1);
        });
    }
}
//# sourceMappingURL=Vector.js.map