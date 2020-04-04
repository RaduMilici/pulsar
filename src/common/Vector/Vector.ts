import point from '../../interfaces/point';
import DisjoinedSet from '../../triangulation/DisjoinedSet';
import QuadTree from '../../quadtree/QuadTree';
import { RadToDeg } from '../../util/radDeg';
import { DEFAULT_VECTOR_POSITION } from '../../constants';
import I_Vector from './I_Vector';

export default class Vector implements I_Vector {
  set: DisjoinedSet;
  quadTree: QuadTree;
  x: number;
  y: number;

  constructor({ x, y }: point = DEFAULT_VECTOR_POSITION) {
    this.x = x;
    this.y = y;
  }

  clone(): I_Vector {
    return new Vector({ x: this.x, y: this.y });
  }

  magnitude(): number {
    const x: number = this.x * this.x;
    const y: number = this.y * this.y;
    return Math.sqrt(x + y);
  }

  dotProduct({ x, y }: I_Vector): number {
    return this.x * x + this.y * y;
  }

  add(vector: I_Vector): I_Vector {
    const x: number = this.x + vector.x;
    const y: number = this.y + vector.y;

    return new Vector({ x, y });
  }

  sub(vector: I_Vector): I_Vector {
    const x: number = this.x + -vector.x;
    const y: number = this.y + -vector.y;

    return new Vector({ x, y });
  }

  multiplyScalar(scalar: number): I_Vector {
    const x: number = this.x * scalar;
    const y: number = this.y * scalar;

    return new Vector({ x, y });
  }

  normalize(): I_Vector {
    const magnitude: number = this.magnitude();
    const x: number = this.x / magnitude;
    const y: number = this.y / magnitude;

    return new Vector({ x, y });
  }

  lerp(vector: I_Vector, alpha: number): I_Vector {
    const x = this.x + (vector.x - this.x) * alpha;
    const y = this.y + (vector.y - this.y) * alpha;

    return new Vector({ x, y });
  }

  negative(): I_Vector {
    const x: number = -this.x;
    const y: number = -this.y;

    return new Vector({ x, y });
  }

  perpendicular(): { left: I_Vector; right: I_Vector } {
    const right: I_Vector = new Vector({ x: -this.y, y: this.x });
    const left: I_Vector = new Vector({ x: this.y, y: -this.x });

    return { left, right };
  }

  scale(length: number): I_Vector {
    const normalized: I_Vector = this.normalize();
    const x: number = normalized.x * length;
    const y: number = normalized.y * length;

    return new Vector({ x, y });
  }

  angleDeg(vector: I_Vector): number {
    const angle: number = this.angle(vector);
    return RadToDeg(angle);
  }

  angleRad(vector: I_Vector): number {
    return this.angle(vector);
  }

  bisector(vector: I_Vector): I_Vector {
    const normalized: I_Vector = this.normalize();
    const normalizedVector: I_Vector = vector.normalize();
    const sum: I_Vector = normalized.add(normalizedVector);
    const magnitude: number = (this.magnitude() + vector.magnitude()) / 2;

    return sum.scale(magnitude);
  }

  equals(vector: I_Vector): boolean {
    return this.x === vector.x && this.y === vector.y;
  }

  distanceTo(vector: I_Vector): number {
    return this.sub(vector).magnitude();
  }

  midpoint(vector: I_Vector): I_Vector {
    const x: number = (this.x + vector.x) / 2;
    const y: number = (this.y + vector.y) / 2;

    return new Vector({ x, y });
  }

  static FindPolyCentroid(points: I_Vector[]): I_Vector {
    let x = 0;
    let y = 0;

    points.forEach((point: I_Vector) => {
      x += point.x;
      y += point.y;
    });

    x /= points.length;
    y /= points.length;

    return new Vector({ x, y });
  }

  static ArrangePointsCCW(points: I_Vector[]): I_Vector[] {
    const centroid: I_Vector = Vector.FindPolyCentroid(points);
    const clone: I_Vector[] = [...points];

    clone.sort((a: I_Vector, b: I_Vector) => {
      const angleA: number = Math.atan2(a.y - centroid.y, a.x - centroid.x);
      const angleB: number = Math.atan2(b.y - centroid.y, b.x - centroid.x);
      return angleA - angleB;
    });

    return clone;
  }

  static UniqueFromArray(points: I_Vector[]): I_Vector[] {
    const isUnique = (vector: I_Vector, index: number, array: I_Vector[]) =>
      array.findIndex((vectorIndex: I_Vector) => {
        return vector.equals(vectorIndex);
      }) === index;

    return points.filter(isUnique);
  }

  private angle(vector: I_Vector): number {
    const product: number = this.dotProduct(vector);
    const cosAngle: number = product / (this.magnitude() * vector.magnitude());
    return Math.acos(cosAngle);
  }
}
