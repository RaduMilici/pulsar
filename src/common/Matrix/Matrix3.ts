import Matrix from './Matrix';
import Matrix2 from './Matrix2';

export default class Matrix3 extends Matrix2 {
  public static readonly ElementCount: number = 9;

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

  transpose(): Matrix3 {
    return new Matrix3(...Matrix3.rowsToColumns(this.elements));
  }

  cofactor(): Matrix3 {
    const cofactors: Array<number> = [];
    const cofactorElements = Matrix.CofactorElements(this.rows, this.columns);
    for (let i = 0; i < cofactorElements.length; i += Matrix2.ElementCount) {
      const { [i]: a, [i + 1]: c, [i + 2]: b, [i + 3]: d } = cofactorElements;
      cofactors.push(new Matrix2(a, b, c, d).determine());
    }
    const [a, b, c, d, e, f, g, h, i] = Matrix3.columnsToRows(cofactors);
    return new Matrix3(a, -b, c, -d, e, -f, g, -h, i);
  }

  invert(): Matrix3 {
    const determinant = this.determine();

    if (determinant === 0) {
      return new Matrix3();
    }

    const inverted = Matrix.MultiplyElementsScalar(
      this.cofactor().transpose().elements,
      1 / determinant
    );

    return new Matrix3(...inverted);
  }

  protected static columnsToRows([a, d, g, b, e, h, c, f, i]: Array<number>): Array<number> {
    return [a, b, c, d, e, f, g, h, i];
  }

  protected static rowsToColumns([a, b, c, d, e, f, g, h, i]: Array<number>): Array<number> {
    return [a, d, g, b, e, h, c, f, i];
  }
}
