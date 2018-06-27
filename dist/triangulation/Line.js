import uniqueId from '../util/uniqueID';
import Triangle from './Triangle';
import DisjoinedSet from './DisjoinedSet';
export default class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.id = uniqueId();
        Line.AllLines.push(this);
    }
    get length() {
        return this.a.sub(this.b).magnitude();
    }
    clone() {
        return new Line(this.a, this.b);
    }
    equals(line) {
        const equalsNormal = this.a.equals(line.a) && this.b.equals(line.b);
        const equalsReverse = this.a.equals(line.b) && this.b.equals(line.a);
        return equalsNormal || equalsReverse;
    }
    makeDisjoinedSets() {
        this.a.set = new DisjoinedSet(this.a);
        this.b.set = new DisjoinedSet(this.b);
    }
    static GetUniqueLines(triangles) {
        const lines = Triangle.LinesFromArray(triangles);
        return Line.UniqueFromArray(lines);
    }
    static PointsFromArray(lines) {
        return lines.reduce((accumulator, line) => {
            accumulator.push(...[line.a, line.b]);
            return accumulator;
        }, []);
    }
    static IsUnique(line, lines) {
        return (lines.find((currentLine) => {
            return line.id === currentLine.id ? false : line.equals(currentLine);
        }) === undefined);
    }
    static UniqueFromArray(lines) {
        const clone = [...lines];
        clone.sort((a, b) => a.length - b.length);
        for (let i = clone.length - 1; i >= 1; i--) {
            const a = clone[i];
            const b = clone[i - 1];
            if (a.equals(b)) {
                clone.splice(i, 1);
            }
        }
        return clone;
    }
}
Line.AllLines = [];
//# sourceMappingURL=Line.js.map