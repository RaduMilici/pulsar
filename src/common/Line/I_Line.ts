import I_Vector from '../Vector/I_Vector';
import { id } from '../../interfaces';

export default interface I_Line extends id {
  readonly a: I_Vector;
  readonly b: I_Vector;
  length: number;
  midpoint: I_Vector;

  clone(): I_Line;
  equals(line: I_Line): boolean;
  intersects(line: I_Line): boolean;
  intersectionPoint(line: I_Line): I_Vector;
  makeDisjoinedSets(): void;
}
