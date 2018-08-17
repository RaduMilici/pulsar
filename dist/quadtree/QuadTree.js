import { Vector, Shape } from '../common';
export default class QuadTree {
    constructor(shape, points) {
        this.shape = shape;
        this.points = points;
        this.children = [];
        this.containedPoints = [];
        this.capacity = 1;
        this.start(points);
    }
    start(points) {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            if (!this.shape.containsPoint(point))
                continue;
            if (this.containedPoints.length < this.capacity) {
                point.quadTree = this;
                this.containedPoints.push(point);
            }
            else {
                this.containedPoints.length = 0;
                this.divide(points);
                break;
            }
        }
    }
    divide(points) {
        const { topLeft, topRight, bottomLeft, bottomRight, } = this.shape.boundingBox;
        const { top, bottom, left, right } = this.shape.boundingBox.midpoints;
        const centroid = Vector.FindPolyCentroid([
            top,
            bottom,
            left,
            right,
        ]);
        const shape1 = new Shape([topLeft, top, centroid, left]);
        const quad1 = new QuadTree(shape1, points);
        const shape2 = new Shape([top, topRight, right, centroid]);
        const quad2 = new QuadTree(shape2, points);
        const shape3 = new Shape([centroid, right, bottomRight, bottom]);
        const quad3 = new QuadTree(shape3, points);
        const shape4 = new Shape([centroid, bottom, bottomLeft, left]);
        const quad4 = new QuadTree(shape4, points);
        this.children.push(quad1, quad2, quad3, quad4);
        this.children.forEach((child) => {
            child.parent = this;
        });
    }
}
//# sourceMappingURL=QuadTree.js.map