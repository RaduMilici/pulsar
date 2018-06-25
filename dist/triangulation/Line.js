import uniqueId from '../util/uniqueID';
import Triangle from './Triangle';
export default class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.id = uniqueId();
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
    static GetUniqueLines(triangles) {
        const lines = Triangle.LinesFromArray(triangles);
        return lines.filter((line) => Line.IsUnique(line, lines));
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
        return lines.filter((line) => {
            return Line.IsUnique(line, lines);
        });
    }
}
Line.AllLines = [];
//# sourceMappingURL=Line.js.map