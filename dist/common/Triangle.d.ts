import Vector from './Vector';
import Line from './Line';
import { id } from '../interfaces';
declare type triangleLines = {
    ab: Line;
    bc: Line;
    ca: Line;
};
export default class Triangle implements id {
    readonly a: Vector;
    readonly b: Vector;
    readonly c: Vector;
    id: number;
    readonly lines: triangleLines;
    constructor(a: Vector, b: Vector, c: Vector);
    readonly centroid: Vector;
    readonly points: Vector[];
    readonly linesArray: Line[];
    equals(triangle: Triangle): boolean;
    isPointInCircumcircle(point: Vector): boolean;
    hasPoint(point: Vector): boolean;
    hasAnyPoint(points: Vector[]): boolean;
    static LinesFromArray(triangles: Triangle[]): Line[];
    static GetUniqueLines(triangles: Triangle[]): Line[];
}
export {};
//# sourceMappingURL=Triangle.d.ts.map