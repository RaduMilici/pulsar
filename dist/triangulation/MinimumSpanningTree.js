import Line from './Line';
import Triangulation from './Triangulation';
export default class MinimumSpanningTree {
    constructor() {
        this.lines = [];
        this._nonMinSpanLines = [];
        this.uniqueLines = [];
    }
    get nonMinSpanLines() {
        return this._nonMinSpanLines;
    }
    start() {
        this.getLines();
        this.uniqueLines.forEach((line) => line.makeDisjoinedSets());
        this.uniqueLines.forEach((line, i) => {
            if (!line.a.set.equals(line.b.set)) {
                line.b.set = line.a.set.merge(line.b.set);
                this.lines.push(line);
                this._nonMinSpanLines[i] = null;
            }
        });
        this._nonMinSpanLines = this._nonMinSpanLines.filter((line) => line);
    }
    getLines() {
        let lines = Line.UniqueFromArray(Triangulation.Lines);
        this.uniqueLines = [...lines];
        this._nonMinSpanLines = [...lines];
    }
}
//# sourceMappingURL=MinimumSpanningTree.js.map