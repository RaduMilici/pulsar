export default class Matrix {
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

  protected static CofactorElements(rows: number[][], columns: number[][]): number[] {
    const cofactorElements: Array<number> = [];

    for (let row = 0; row < rows.length; row++) {
      const remaining: Array<number> = [];
      const currentRows = [...rows];
      currentRows.splice(row, 1);

      for (let col = 0; col < columns.length; col++) {
        for (let i = 0; i < currentRows.length; i++) {
          const currentNumbers = [...currentRows[i]];
          currentNumbers.splice(col, 1);
          remaining.push(...currentNumbers);
        }

        cofactorElements.push(...remaining);
        remaining.length = 0;
      }
    }

    return cofactorElements;
  }
}
