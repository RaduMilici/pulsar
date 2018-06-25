class Matrix2 {
  constructor(readonly a: number, readonly b: number, readonly c: number, readonly d: number) {}

  determine(): number {
    return this.a * this.d - this.b * this.c;
  }
}

class Matrix3 extends Matrix2 {
  constructor(
    a: number,
    b: number,
    c: number,
    d: number,
    readonly e: number,
    readonly f: number,
    readonly g: number,
    readonly h: number,
    readonly i: number
  ) {
    super(a, b, c, d);
  }

  determine(): number {
    return (
      this.a * new Matrix2(this.e, this.f, this.h, this.i).determine() -
      this.b * new Matrix2(this.d, this.f, this.g, this.i).determine() +
      this.c * new Matrix2(this.d, this.e, this.g, this.h).determine()
    );
  }
}

class Matrix4 extends Matrix3 {
  constructor(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
    g: number,
    h: number,
    i: number,
    readonly j: number,
    readonly k: number,
    readonly l: number,
    readonly m: number,
    readonly n: number,
    readonly o: number,
    readonly p: number
  ) {
    super(a, b, c, d, e, f, g, h, i);
  }

  determine(): number {
    return (
      this.a * new Matrix3(this.f, this.g, this.h, this.j, this.k, this.l, this.n, this.o, this.p).determine() -
      this.b * new Matrix3(this.e, this.g, this.h, this.i, this.k, this.l, this.m, this.o, this.p).determine() +
      this.c * new Matrix3(this.e, this.f, this.h, this.i, this.j, this.l, this.m, this.n, this.p).determine() -
      this.d * new Matrix3(this.e, this.f, this.g, this.i, this.j, this.k, this.m, this.n, this.o).determine()
    );
  }
}

export { Matrix2, Matrix3, Matrix4 };
