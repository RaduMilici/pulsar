import { Vector, BoundingBox } from '../common';
declare const randomInt: (min: number, max: number) => number;
declare const randomFloat: (min: number, max: number) => number;
declare const randomColor: () => string;
declare const randomPoint: ({ topLeft, topRight, bottomLeft, }: BoundingBox) => Vector;
declare const randomPoints: (count: number, box: BoundingBox) => Vector[];
export { randomInt, randomFloat, randomColor, randomPoint, randomPoints };
//# sourceMappingURL=random.d.ts.map