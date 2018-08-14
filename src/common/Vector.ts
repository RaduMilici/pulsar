import point from '../interfaces/point';
import DisjoinedSet from '../triangulation/DisjoinedSet';
import QuadTree from '../quadtree/QuadTree';
import { toFloat, RadToDeg } from '../util';

export default class Vector {
  set: DisjoinedSet;
  quadTree: QuadTree;
  x: number;
  y: number;

  constructor({ x, y }: point = { x: 0, y: 0 }) {
    this.x = toFloat(x);
    this.y = toFloat(y);
  }

  clone(): Vector {
    return new Vector({ x: this.x, y: this.y });
  }

  magnitude(): number {
    const x: number = this.x * this.x;
    const y: number = this.y * this.y;
    const magnitude: number = Math.sqrt(x + y);
    return toFloat(magnitude);
  }

  dotProduct({ x, y }: Vector): number {
    return this.x * x + this.y * y;
  }

  add(vector: Vector): Vector {
    const x: number = this.x + vector.x;
    const y: number = this.y + vector.y;

    return new Vector({ x, y });
  }

  sub(vector: Vector): Vector {
    const x: number = this.x + -vector.x;
    const y: number = this.y + -vector.y;

    return new Vector({ x, y });
  }

  normalize(): Vector {
    const magnitude: number = this.magnitude();
    const x: number = this.x / magnitude;
    const y: number = this.y / magnitude;

    return new Vector({ x, y });
  }

  negative(): Vector {
    const x: number = -this.x;
    const y: number = -this.y;

    return new Vector({ x, y });
  }

  perpendicular(): { left: Vector; right: Vector } {
    const right: Vector = new Vector({ x: -this.y, y: this.x });
    const left: Vector = new Vector({ x: this.y, y: -this.x });

    return { left, right };
  }

  scale(length: number): Vector {
    const normalized: Vector = this.normalize();
    const x: number = normalized.x * length;
    const y: number = normalized.y * length;

    return new Vector({ x, y });
  }

  angleDeg(vector: Vector): number {
    const angle: number = this.angle(vector);
    const degAngle: number = RadToDeg(angle);
    return toFloat(degAngle);
  }

  angleRad(vector: Vector): number {
    const angle: number = this.angle(vector);
    return toFloat(angle);
  }

  bisector(vector: Vector): Vector {
    const normalized: Vector = this.normalize();
    const normalizedVector: Vector = vector.normalize();
    const sum: Vector = normalized.add(normalizedVector);
    const magnitude: number = (this.magnitude() + vector.magnitude()) / 2;

    return sum.scale(magnitude);
  }

  equals(vector: Vector): boolean {
    return this.x === vector.x && this.y === vector.y;
  }

  midpoint(vector: Vector): Vector {
    const x: number = (this.x + vector.x) / 2;
    const y: number = (this.y + vector.y) / 2;

    return new Vector({ x, y });
  }

  static FindPolyCentroid(points: Vector[]): Vector {
    let x = 0;
    let y = 0;

    points.forEach((point: Vector) => {
      x += point.x;
      y += point.y;
    });

    x /= points.length;
    y /= points.length;

    return new Vector({ x, y });
  }

  static ArrangePointsCCW(points: Vector[]): Vector[] {
    const centroid: Vector = Vector.FindPolyCentroid(points);
    let clone: Vector[] = [...points];

    clone.sort((a: Vector, b: Vector) => {
      const angleA: number = Math.atan2(a.y - centroid.y, a.x - centroid.x);
      const angleB: number = Math.atan2(b.y - centroid.y, b.x - centroid.x);
      return angleA - angleB;
    });

    return clone;
  }

  static UniqueFromArray(points: Vector[]): Vector[] {
    const isUnique = (vector: Vector, index: number, array: Vector[]) => {
      return (
        array.findIndex((vectorIndex: Vector) => {
          return vector.equals(vectorIndex);
        }) === index
      );
    };

    return points.filter(isUnique);
  }

  private angle(vector: Vector): number {
    const product: number = this.dotProduct(vector);
    const cosAngle: number = product / (this.magnitude() * vector.magnitude());
    return Math.acos(cosAngle);
  }
}
