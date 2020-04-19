import { Vector, Line, Triangle } from '../../common';

export default interface I_Triangulation {
  readonly lines: Line[];
  readonly triangles: Triangle[];
}
