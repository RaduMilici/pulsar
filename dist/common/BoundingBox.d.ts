import Vector from './Vector';
import Line from './Line';
import limits from '../interfaces/limits';
export default class BoundingBox {
    private readonly points;
    topLeft: Vector;
    topRight: Vector;
    bottomRight: Vector;
    bottomLeft: Vector;
    private top;
    private right;
    private bottom;
    private left;
    readonly lines: Line[];
    readonly limits: limits;
    constructor(points: Vector[]);
    readonly midpoints: limits;
    readonly area: number;
    private findCorners;
    private makeLines;
    private getLimits;
}
//# sourceMappingURL=BoundingBox.d.ts.map