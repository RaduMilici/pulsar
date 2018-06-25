import Line from './Line';
import Triangle from './Triangle';
import DisjoinedSet from './DisjoinedSet';
export default class MinimumSpanningTree {
    constructor({ points, triangles }) {
        this._nonMinSpanLines = [];
        this.uniqueLines = [];
        this.points = [...points];
        const triangleLines = Triangle.LinesFromArray(triangles);
        this.uniqueLines = Line.UniqueFromArray(triangleLines);
        this.uniqueLines.sort((a, b) => a.length - b.length);
        this._nonMinSpanLines = [...this.uniqueLines];
    }
    get nonMinSpanLines() {
        return this._nonMinSpanLines;
    }
    start() {
        this.points.forEach((point) => {
            new DisjoinedSet(point);
        });
        this.uniqueLines.forEach((line, i) => {
            if (line.a.set.equals(line.b.set)) {
                line.b.set = line.a.set.merge(line.b.set);
                this.lines.push(line);
                this._nonMinSpanLines[i] = null;
            }
        });
        this._nonMinSpanLines = this._nonMinSpanLines.filter((line) => line);
    }
}
//# sourceMappingURL=MinimumSpanningTree.js.map