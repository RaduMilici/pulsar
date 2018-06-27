import Vector from './Vector';
import Line from './Line';
import Triangle from './Triangle';
import Hull from './Hull';
import MinimumSpanningTree from './MinimumSpanningTree';
export default class Triangulation {
    constructor(points) {
        this.points = points;
        this.triangles = [];
        this.holderTriangle = Triangulation.MakeHolderTriangle();
        this.triangles.push(this.holderTriangle);
        this.hull = new Hull(this);
        this.MST = new MinimumSpanningTree();
    }
    start() {
        this.points.forEach((point) => {
            const badTriangles = [];
            for (let i = this.triangles.length - 1; i >= 0; i--) {
                const triangle = this.triangles[i];
                if (triangle.isPointInCircumcircle(point)) {
                    this.triangles.splice(i, 1);
                    badTriangles.push(triangle);
                }
            }
            const uniqueLines = Line.GetUniqueLines(badTriangles);
            uniqueLines.forEach((line) => {
                const triangle = new Triangle(point, line.a, line.b);
                this.triangles.push(triangle);
            });
        });
        this.cleanHolderTriangle();
        this.addFinishedTriangulationLines();
    }
    static MakeHolderTriangle() {
        const side = Number.MAX_SAFE_INTEGER;
        const a = new Vector({ x: side / 2, y: -side });
        const b = new Vector({ x: -side, y: side });
        const c = new Vector({ x: side, y: side });
        return new Triangle(a, b, c);
    }
    cleanHolderTriangle() {
        const { a, b, c } = this.holderTriangle;
        for (let i = this.triangles.length - 1; i >= 0; i--) {
            const triangle = this.triangles[i];
            if (triangle.hasAnyPoint([a, b, c])) {
                this.triangles.splice(i, 1);
            }
        }
    }
    addFinishedTriangulationLines() {
        this.triangles.forEach((triangle) => {
            Triangulation.Lines.push(...triangle.linesArray);
        });
    }
}
Triangulation.Lines = [];
//# sourceMappingURL=Triangulation.js.map