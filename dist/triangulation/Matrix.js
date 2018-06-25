class Matrix2 {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    determine() {
        return this.a * this.d - this.b * this.c;
    }
}
class Matrix3 extends Matrix2 {
    constructor(a, b, c, d, e, f, g, h, i) {
        super(a, b, c, d);
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
    }
    determine() {
        return (this.a * new Matrix2(this.e, this.f, this.h, this.i).determine() -
            this.b * new Matrix2(this.d, this.f, this.g, this.i).determine() +
            this.c * new Matrix2(this.d, this.e, this.g, this.h).determine());
    }
}
class Matrix4 extends Matrix3 {
    constructor(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        super(a, b, c, d, e, f, g, h, i);
        this.j = j;
        this.k = k;
        this.l = l;
        this.m = m;
        this.n = n;
        this.o = o;
        this.p = p;
    }
    determine() {
        return (this.a * new Matrix3(this.f, this.g, this.h, this.j, this.k, this.l, this.n, this.o, this.p).determine() -
            this.b * new Matrix3(this.e, this.g, this.h, this.i, this.k, this.l, this.m, this.o, this.p).determine() +
            this.c * new Matrix3(this.e, this.f, this.h, this.i, this.j, this.l, this.m, this.n, this.p).determine() -
            this.d * new Matrix3(this.e, this.f, this.g, this.i, this.j, this.k, this.m, this.n, this.o).determine());
    }
}
export { Matrix2, Matrix3, Matrix4 };
//# sourceMappingURL=Matrix.js.map