import Matrix from './Matrix';
import Matrix3 from './Matrix3';

export default class Matrix4 extends Matrix3 {
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
    this.rows = [
      [a, b, c, d],
      [e, f, g, h],
      [i, j, k, l],
      [m, n, o, p],
    ];
    this.columns = [
      [a, e, i, m],
      [b, f, j, n],
      [c, g, k, o],
      [d, h, l, p],
    ];
  }

  get elements(): number[] {
    return [...super.elements, this.j, this.k, this.l, this.m, this.n, this.o, this.p];
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

  add({ elements }: Matrix4): Matrix4 {
    const sum: number[] = Matrix.AddElements(this.elements, elements);
    return new Matrix4(...sum);
  }

  multiplyScalar(scalar: number): Matrix4 {
    const product: number[] = Matrix.MultiplyElementsScalar(this.elements, scalar);
    return new Matrix4(...product);
  }

  multiply({ columns }: Matrix4): Matrix4 {
    const product: number[] = Matrix.Multiply(this.rows, columns);
    return new Matrix4(...product);
  }
}
