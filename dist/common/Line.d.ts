import { id } from '../interfaces';
import Vector from './Vector';
export default class Line implements id {
    readonly a: Vector;
    readonly b: Vector;
    id: number;
    constructor(a: Vector, b: Vector);
    readonly length: number;
    readonly midpoint: Vector;
    clone(): Line;
    equals(line: Line): boolean;
    intersects(line: Line): boolean;
    intersectionPoint(line: Line): Vector;
    makeDisjoinedSets(): void;
    static PointsFromArray(lines: Line[]): Vector[];
    static IsUnique(line: Line, lines: Line[]): boolean;
    static RemoveDuplicates(lines: Line[]): Line[];
}
//# sourceMappingURL=Line.d.ts.map