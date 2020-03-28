export default abstract class Matrix {
  rows: number[][] = [];
  columns: number[][] = [];

  protected static AddElements(elementsA: number[], elementsB: number[]): number[] {
    return elementsA.map((elementA: number, index: number) => elementA + elementsB[index]);
  }

  protected static MultiplyElementsScalar(elements: number[], scalar: number): number[] {
    let sum: number[] = new Array(elements.length).fill(0);

    for (let i = 0; i < scalar; i++) {
      sum = Matrix.AddElements(sum, elements);
    }

    return sum;
  }

  protected static Multiply(rows: number[][], columns: number[][]): number[] {
    const elements: number[] = [];

    rows.forEach((row: number[]): void =>
      columns.forEach((column: number[]): void => {
        const element: number = Matrix.CrossProduct(row, column);
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
