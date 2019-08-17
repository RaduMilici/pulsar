class Matrix2 {
  constructor(
    readonly a: number = 0,
    readonly b: number = 0,
    readonly c: number = 0,
    readonly d: number = 0
  ) {}

  get elements(): number[] {
    return [this.a, this.b, this.c, this.d];
  }

  determine(): number {
    return this.a * this.d - this.b * this.c;
  }

  multiplyScalar(scalar: number): Matrix2 {
    const [a, b, c, d]: number[] = this.elements.map((element: number) => {
      return scalar * element;
    });
    return new Matrix2(a, b, c, d);
  }
}

class Matrix3 extends Matrix2 {
  constructor(
    a: number = 0,
    b: number = 0,
    c: number = 0,
    d: number = 0,
    readonly e: number = 0,
    readonly f: number = 0,
    readonly g: number = 0,
    readonly h: number = 0,
    readonly i: number = 0
  ) {
    super(a, b, c, d);
  }

  get elements(): number[] {
    return [...super.elements, this.e, this.f, this.g, this.h, this.i];
  }

  determine(): number {
    return (
      this.a * new Matrix2(this.e, this.f, this.h, this.i).determine() -
      this.b * new Matrix2(this.d, this.f, this.g, this.i).determine() +
      this.c * new Matrix2(this.d, this.e, this.g, this.h).determine()
    );
  }

  multiplyScalar(scalar: number): Matrix3 {
    const [a, b, c, d]: number[] = super.multiplyScalar(scalar).elements;
    const { 4: e, 5: f, 6: g, 7: h, 8: i }: number[] = this.elements.map(
      (element: number) => {
        return scalar * element;
      }
    );
    return new Matrix3(a, b, c, d, e, f, g, h, i);
  }
}

class Matrix4 extends Matrix3 {
  constructor(
    a: number = 0,
    b: number = 0,
    c: number = 0,
    d: number = 0,
    e: number = 0,
    f: number = 0,
    g: number = 0,
    h: number = 0,
    i: number = 0,
    readonly j: number = 0,
    readonly k: number = 0,
    readonly l: number = 0,
    readonly m: number = 0,
    readonly n: number = 0,
    readonly o: number = 0,
    readonly p: number = 0
  ) {
    super(a, b, c, d, e, f, g, h, i);
  }

  get elements(): number[] {
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

  determine(): number {
    return (
      this.a *
        new Matrix3(
          this.f,
          this.g,
          this.h,
          this.j,
          this.k,
          this.l,
          this.n,
          this.o,
          this.p
        ).determine() -
      this.b *
        new Matrix3(
          this.e,
          this.g,
          this.h,
          this.i,
          this.k,
          this.l,
          this.m,
          this.o,
          this.p
        ).determine() +
      this.c *
        new Matrix3(
          this.e,
          this.f,
          this.h,
          this.i,
          this.j,
          this.l,
          this.m,
          this.n,
          this.p
        ).determine() -
      this.d *
        new Matrix3(
          this.e,
          this.f,
          this.g,
          this.i,
          this.j,
          this.k,
          this.m,
          this.n,
          this.o
        ).determine()
    );
  }

  multiplyScalar(scalar: number): Matrix4 {
    const [a, b, c, d, e, f, g, h, i]: number[] = super.multiplyScalar(
      scalar
    ).elements;
    const {
      9: j,
      10: k,
      11: l,
      12: m,
      13: n,
      14: o,
      15: p,
    }: number[] = this.elements.map((element: number) => {
      return scalar * element;
    });
    return new Matrix4(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
  }
}

export { Matrix2, Matrix3, Matrix4 };
