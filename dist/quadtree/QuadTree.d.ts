import { Vector, Shape } from '../common';
export default class QuadTree {
    shape: Shape;
    private points;
    level: number;
    parent: QuadTree;
    readonly children: QuadTree[];
    readonly containedPoints: Vector[];
    private capacity;
    constructor(shape: Shape, points: Vector[], level?: number);
    private start;
    getLevel(level: number): QuadTree[] | null;
    findChildThatContains(point: Vector): QuadTree;
    divide(points: Vector[]): void;
}
//# sourceMappingURL=QuadTree.d.ts.map