import { point } from '../interfaces';
import { DisjoinedSet } from '../triangulation';
import { QuadTree } from '../quadtree';
export default class Vector {
    set: DisjoinedSet;
    quadTree: QuadTree;
    x: number;
    y: number;
    constructor({ x, y }?: point);
    clone(): Vector;
    magnitude(): number;
    dotProduct({ x, y }: Vector): number;
    add(vector: Vector): Vector;
    sub(vector: Vector): Vector;
    multiplyScalar(scalar: number): Vector;
    normalize(): Vector;
    lerp(vector: Vector, alpha: number): Vector;
    negative(): Vector;
    perpendicular(): {
        left: Vector;
        right: Vector;
    };
    scale(length: number): Vector;
    angleDeg(vector: Vector): number;
    angleRad(vector: Vector): number;
    bisector(vector: Vector): Vector;
    equals(vector: Vector): boolean;
    distanceTo(vector: Vector): number;
    midpoint(vector: Vector): Vector;
    static FindPolyCentroid(points: Vector[]): Vector;
    static ArrangePointsCCW(points: Vector[]): Vector[];
    static UniqueFromArray(points: Vector[]): Vector[];
    private angle;
}
//# sourceMappingURL=Vector.d.ts.map