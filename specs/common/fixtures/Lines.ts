import Line from '../../../src/common/Line';
import { v00, v01, v10, v11, v22 } from './Vectors';
import { Vector } from "../../../src/common";

const makeLine = (a: Vector, b: Vector): Line => {
  // id is irrelevant in specs and tampers with assertions
  const line: Line = new Line(a, b);
  delete line.id;
  return line;
};

const ab: Line = makeLine(v00, v11);
const bc: Line = makeLine(v11, v22);
const ca: Line = makeLine(v22, v00);

const ad: Line = makeLine(v00, v10);
const de: Line = makeLine(v10, v11);
const ef: Line = makeLine(v11, v01);
const fa: Line = makeLine(v01, v00);

export { ab, bc, ca, ad, de, ef, fa };
