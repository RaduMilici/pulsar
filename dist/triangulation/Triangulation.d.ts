import Vector from './Vector';
import Line from './Line';
import Triangle from './Triangle';
import Hull from './Hull';
import MinimumSpanningTree from './MinimumSpanningTree';
export default class Triangulation {
    readonly points: Vector[];
    static readonly Lines: Line[];
    readonly triangles: Triangle[];
    readonly MST: MinimumSpanningTree;
    readonly hull: Hull;
    private holderTriangle;
    constructor(points: Vector[]);
    start(): void;
    private static MakeHolderTriangle;
    private cleanHolderTriangle;
    private addFinishedTriangulationLines;
}
//# sourceMappingURL=Triangulation.d.ts.map