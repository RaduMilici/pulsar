import Vector from '../Vector';
import { id } from '../../interfaces';

export default interface I_Line extends id {
  readonly a: Vector;
  readonly b: Vector;
  length: number;
  midpoint: Vector;

  clone(): I_Line;

  equals(line: I_Line): boolean;

  intersects(line: I_Line): boolean;

  intersectionPoint(line: I_Line): Vector;

  makeDisjoinedSets(): void;
}
