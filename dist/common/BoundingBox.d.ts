import { limits } from '../interfaces';
import Vector from './Vector';
import Line from './Line';
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
    limits: limits;
    constructor(points: Vector[]);
    readonly midpoints: limits;
    readonly area: number;
    readonly lines: Line[];
    readonly width: number;
    readonly height: number;
    grow(n: number): void;
    clone(): BoundingBox;
    private findCorners;
    private makeLines;
    private findLimits;
}
//# sourceMappingURL=BoundingBox.d.ts.map