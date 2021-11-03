import Matrix from './Matrix';

export default class Matrix2 extends Matrix {
  constructor(
    readonly a: number = 0,
    readonly b: number = 0,
    readonly c: number = 0,
    readonly d: number = 0
  ) {
    super();
    this.rows = [
      [a, c],
      [b, d],
    ];
    this.columns = [
      [a, b],
      [c, d],
    ];
  }

  get elements(): number[] {
    return [this.a, this.b, this.c, this.d];
  }

  determine(): number {
    return this.a * this.d - this.b * this.c;
  }

  add({ elements }: Matrix2): Matrix2 {
    return new Matrix2(...Matrix.AddElements(this.elements, elements));
  }

  multiply(m2: Matrix2): Matrix2 {
    const product: number[] = Matrix.Multiply(this.rows, m2.columns);
    return new Matrix2(...product);
  }

  multiplyScalar(scalar: number): Matrix2 {
    const product: number[] = Matrix.MultiplyElementsScalar(this.elements, scalar);
    return new Matrix2(...product);
  }

  invert(): Matrix2 {
    const determinant = this.determine();

    if (determinant === 0) {
      return new Matrix2();
    }

    const inverted = Matrix.MultiplyElementsScalar(
      [this.d, -this.b, -this.c, this.a],
      1 / determinant
    );
    return new Matrix2(...inverted);
  }
}
