import Line from './Line';
import Triangulation from './Triangulation';
export default class MinimumSpanningTree {
    readonly lines: Line[];
    private _nonMinSpanLines;
    private uniqueLines;
    private readonly points;
    constructor({ lines }: Triangulation);
    readonly nonMinSpanLines: Line[];
    start(): void;
    private getLines;
}
//# sourceMappingURL=MinimumSpanningTree.d.ts.map