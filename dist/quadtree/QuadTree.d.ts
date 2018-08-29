import { Vector, Shape } from '../common';
export default class QuadTree {
    shape: Shape;
    private points;
    children: QuadTree[];
    containedPoints: Vector[];
    parent: QuadTree;
    private capacity;
    constructor(shape: Shape, points: Vector[]);
    private start;
    findChildThatContains(point: Vector): QuadTree;
    divide(points: Vector[]): void;
}
//# sourceMappingURL=QuadTree.d.ts.map