import I_Vector from '../Vector/I_Vector';
import { limits, boundingBoxLines } from '../../interfaces';

export default interface I_BoundingBox {
  readonly lines: boundingBoxLines;
  topLeft: I_Vector;
  topRight: I_Vector;
  bottomRight: I_Vector;
  bottomLeft: I_Vector;
  points: I_Vector[];
  limits: limits;
  midpoints: limits;
  area: number;
  width: number;
  height: number;

  growBy(n: number): void;
  clone(): I_BoundingBox;
}
