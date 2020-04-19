import Vector from './Vector';
import Line from './Line';
import BoundingBox from './BoundingBox';
export default class Shape {
    readonly points: Vector[];
    readonly lines: Line[];
    readonly boundingBox: BoundingBox;
    constructor(points: Vector[]);
    containsPoint(point: Vector): boolean;
    readonly centroid: Vector;
    private static makeLines;
}
//# sourceMappingURL=Shape.d.ts.map