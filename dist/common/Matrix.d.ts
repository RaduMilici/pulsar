declare abstract class Matrix {
    rows: number[][];
    columns: number[][];
    protected static AddElements(elementsA: number[], elementsB: number[]): number[];
    protected static MultiplyElementsScalar(elements: number[], scalar: number): number[];
    protected static Multiply(rows: number[][], columns: number[][]): number[];
    private static CrossProduct;
}
declare class Matrix2 extends Matrix {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    constructor(a?: number, b?: number, c?: number, d?: number);
    readonly elements: number[];
    determine(): number;
    add({ elements }: Matrix2): Matrix2;
    multiply(m2: Matrix2): Matrix2;
    multiplyScalar(scalar: number): Matrix2;
}
declare class Matrix3 extends Matrix2 {
    readonly e: number;
    readonly f: number;
    readonly g: number;
    readonly h: number;
    readonly i: number;
    constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number, i?: number);
    readonly elements: number[];
    determine(): number;
    add({ elements }: Matrix3): Matrix3;
    multiply({ columns }: Matrix3): Matrix3;
    multiplyScalar(scalar: number): Matrix3;
}
declare class Matrix4 extends Matrix3 {
    readonly j: number;
    readonly k: number;
    readonly l: number;
    readonly m: number;
    readonly n: number;
    readonly o: number;
    readonly p: number;
    constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number, i?: number, j?: number, k?: number, l?: number, m?: number, n?: number, o?: number, p?: number);
    readonly elements: number[];
    determine(): number;
    add({ elements }: Matrix4): Matrix4;
    multiplyScalar(scalar: number): Matrix4;
    multiply({ columns }: Matrix4): Matrix4;
}
export { Matrix2, Matrix3, Matrix4 };
//# sourceMappingURL=Matrix.d.ts.map