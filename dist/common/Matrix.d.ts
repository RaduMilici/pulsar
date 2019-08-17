declare class Matrix2 {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    constructor(a: number, b: number, c: number, d: number);
    determine(): number;
    multiplyScalar(scalar: number): Matrix2;
}
declare class Matrix3 extends Matrix2 {
    readonly e: number;
    readonly f: number;
    readonly g: number;
    readonly h: number;
    readonly i: number;
    constructor(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number);
    determine(): number;
}
declare class Matrix4 extends Matrix3 {
    readonly j: number;
    readonly k: number;
    readonly l: number;
    readonly m: number;
    readonly n: number;
    readonly o: number;
    readonly p: number;
    constructor(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number);
    determine(): number;
}
export { Matrix2, Matrix3, Matrix4 };
//# sourceMappingURL=Matrix.d.ts.map