import Line from './Line';
import Triangulation from './Triangulation';
export default class MinimumSpanningTree {
    readonly lines: Line[];
    private _nonMinSpanLines;
    private readonly uniqueLines;
    private readonly points;
    constructor({ points, triangles }: Triangulation);
    readonly nonMinSpanLines: Line[];
    start(): void;
}
//# sourceMappingURL=MinimumSpanningTree.d.ts.map