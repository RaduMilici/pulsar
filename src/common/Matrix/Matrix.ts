export default abstract class Matrix {
  rows: number[][] = [];
  columns: number[][] = [];

  protected static AddElements(elementsA: number[], elementsB: number[]): number[] {
    return elementsA.map((elementA: number, index: number) => elementA + elementsB[index]);
  }

  protected static MultiplyElementsScalar(elements: number[], scalar: number): number[] {
    return elements.map(element => element * scalar);
  }

  protected static Multiply(rows: number[][], columns: number[][]): number[] {
    const elements: number[] = [];

    columns.forEach((column: number[]): void =>
      rows.forEach((row: number[]): void => {
        const element: number = Matrix.CrossProduct(column, row);
        elements.push(element);
      })
    );

    return elements;
  }

  private static CrossProduct(row: number[], column: number[]): number {
    return row.reduce(
      (acc: number, number: number, index: number): number => acc + number * column[index],
      0
    );
  }
}
