import Line from './Line';
import { Vector } from '../common';
export default class LineIntersection {
    private line1;
    private line2;
    private readonly x1;
    private readonly y1;
    private readonly x2;
    private readonly y2;
    private readonly x3;
    private readonly y3;
    private readonly x4;
    private readonly y4;
    private readonly efghDeterminant;
    constructor(line1: Line, line2: Line);
    readonly intersects: boolean;
    readonly point: Vector;
    private getX;
    private getY;
    private isOnSegments;
}
//# sourceMappingURL=LineIntersection.d.ts.map