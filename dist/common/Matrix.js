class Matrix {
    constructor() {
        this.rows = [];
        this.columns = [];
    }
    static AddElements(elementsA, elementsB) {
        return elementsA.map((elementA, index) => {
            return elementA + elementsB[index];
        });
    }
    static MultiplyElementsScalar(elements, scalar) {
        let sum = new Array(elements.length).fill(0);
        for (let i = 0; i < scalar; i++) {
            sum = Matrix.AddElements(sum, elements);
        }
        return sum;
    }
    static Multiply(rows, columns) {
        const elements = [];
        rows.forEach((row) => {
            columns.forEach((column) => {
                const element = Matrix.CrossProduct(row, column);
                elements.push(element);
            });
        });
        return elements;
    }
    static CrossProduct(row, column) {
        return row.reduce((acc, number, index) => {
            acc += number * column[index];
            return acc;
        }, 0);
    }
}
class Matrix2 extends Matrix {
    constructor(a = 0, b = 0, c = 0, d = 0) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.rows = [[a, b], [c, d]];
        this.columns = [[a, c], [b, d]];
    }
    get elements() {
        return [this.a, this.b, this.c, this.d];
    }
    determine() {
        return this.a * this.d - this.b * this.c;
    }
    add({ elements }) {
        const sum = Matrix.AddElements(this.elements, elements);
        return new Matrix2(...sum);
    }
    multiply(m2) {
        const elements = Matrix.Multiply(this.rows, m2.columns);
        return new Matrix2(...elements);
    }
    multiplyScalar(scalar) {
        const product = Matrix.MultiplyElementsScalar(this.elements, scalar);
        return new Matrix2(...product);
    }
}
class Matrix3 extends Matrix2 {
    constructor(a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0) {
        super(a, b, c, d);
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
        this.rows = [[a, b, c], [d, e, f], [g, h, i]];
        this.columns = [[a, d, g], [b, e, h], [c, f, i]];
    }
    get elements() {
        return [...super.elements, this.e, this.f, this.g, this.h, this.i];
    }
    determine() {
        return (this.a * new Matrix2(this.e, this.f, this.h, this.i).determine() -
            this.b * new Matrix2(this.d, this.f, this.g, this.i).determine() +
            this.c * new Matrix2(this.d, this.e, this.g, this.h).determine());
    }
    add({ elements }) {
        const sum = Matrix.AddElements(this.elements, elements);
        return new Matrix3(...sum);
    }
    multiply({ columns }) {
        const elements = Matrix.Multiply(this.rows, columns);
        return new Matrix3(...elements);
    }
    multiplyScalar(scalar) {
        const product = Matrix.MultiplyElementsScalar(this.elements, scalar);
        return new Matrix3(...product);
    }
}
class Matrix4 extends Matrix3 {
    constructor(a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0) {
        super(a, b, c, d, e, f, g, h, i);
        this.j = j;
        this.k = k;
        this.l = l;
        this.m = m;
        this.n = n;
        this.o = o;
        this.p = p;
        this.rows = [[a, b, c, d], [e, f, g, h], [i, j, k, l], [m, n, o, p]];
        this.columns = [[a, e, i, m], [b, f, j, n], [c, g, k, o], [d, h, l, p]];
    }
    get elements() {
        return [
            ...super.elements,
            this.j,
            this.k,
            this.l,
            this.m,
            this.n,
            this.o,
            this.p,
        ];
    }
    determine() {
        return (this.a *
            new Matrix3(this.f, this.g, this.h, this.j, this.k, this.l, this.n, this.o, this.p).determine() -
            this.b *
                new Matrix3(this.e, this.g, this.h, this.i, this.k, this.l, this.m, this.o, this.p).determine() +
            this.c *
                new Matrix3(this.e, this.f, this.h, this.i, this.j, this.l, this.m, this.n, this.p).determine() -
            this.d *
                new Matrix3(this.e, this.f, this.g, this.i, this.j, this.k, this.m, this.n, this.o).determine());
    }
    add({ elements }) {
        const sum = Matrix.AddElements(this.elements, elements);
        return new Matrix4(...sum);
    }
    multiplyScalar(scalar) {
        const product = Matrix.MultiplyElementsScalar(this.elements, scalar);
        return new Matrix4(...product);
    }
    multiply({ columns }) {
        const elements = Matrix.Multiply(this.rows, columns);
        return new Matrix4(...elements);
    }
}
export { Matrix2, Matrix3, Matrix4 };
//# sourceMappingURL=Matrix.js.map