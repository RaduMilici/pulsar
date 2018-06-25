import Vector from './Vector';
import Triangle from './Triangle';
import Hull from './Hull';
import MinimumSpanningTree from './MinimumSpanningTree';
export default class Triangulation {
    readonly points: Vector[];
    readonly triangles: Triangle[];
    readonly MST: MinimumSpanningTree;
    readonly hull: Hull;
    private holderTriangle;
    constructor(points: Vector[]);
    start(): void;
    private static MakeHolderTriangle;
    private cleanHolderTriangle;
}
//# sourceMappingURL=Triangulation.d.ts.map