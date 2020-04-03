import DisjoinedSet from '../../triangulation/DisjoinedSet';
import QuadTree from '../../quadtree/QuadTree';

export default interface I_Vector {
  set: DisjoinedSet;
  quadTree: QuadTree;
  x: number;
  y: number;

  clone(): I_Vector;
  magnitude(): number;
  dotProduct({ x, y }: I_Vector): number;
  add(vector: I_Vector): I_Vector;
  sub(vector: I_Vector): I_Vector;
  multiplyScalar(scalar: number): I_Vector;
  normalize(): I_Vector;
  lerp(vector: I_Vector, alpha: number): I_Vector;
  negative(): I_Vector;
  perpendicular(): { left: I_Vector; right: I_Vector };
  scale(length: number): I_Vector;
  angleDeg(vector: I_Vector): number;
  angleRad(vector: I_Vector): number;
  bisector(vector: I_Vector): I_Vector;
  equals(vector: I_Vector): boolean;
  distanceTo(vector: I_Vector): number;
  midpoint(vector: I_Vector): I_Vector;
}
