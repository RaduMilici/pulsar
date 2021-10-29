import Matrix from './Matrix';
import Matrix2 from './Matrix2';

export default class Matrix3 extends Matrix2 {
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
    this.rows = [
      [a, d, g],
      [b, e, h],
      [c, f, i],
    ];
    this.columns = [
      [a, b, c],
      [d, e, f],
      [g, h, i],
    ];
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

  add({ elements }: Matrix3): Matrix3 {
    const sum: number[] = Matrix.AddElements(this.elements, elements);
    return new Matrix3(...sum);
  }

  multiply({ columns }: Matrix3): Matrix3 {
    const product: number[] = Matrix.Multiply(this.rows, columns);
    return new Matrix3(...product);
  }

  multiplyScalar(scalar: number): Matrix3 {
    const product: number[] = Matrix.MultiplyElementsScalar(this.elements, scalar);
    return new Matrix3(...product);
  }
}
