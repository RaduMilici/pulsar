import Vector from './Vector';
import Line from './Line';
import limits from '../interfaces/limits';
import { immutableObjectSort } from '../util/sort';

/*
* !WARNING!
* This class regards its point of origin at the top left corner.
* */

export default class BoundingBox {
  // points
  topLeft: Vector;
  topRight: Vector;
  bottomRight: Vector;
  bottomLeft: Vector;

  // lines
  private top: Line;
  private right: Line;
  private bottom: Line;
  private left: Line;

  limits: limits;

  constructor(private readonly points: Vector[]) {
    this.findCorners();
    this.makeLines();
    this.findLimits();
  }

  get midpoints(): limits {
    return this.limits;
  }

  get area(): number {
    return this.top.length * this.right.length;
  }

  get lines(): Line[] {
    return [this.top, this.right, this.bottom, this.left];
  }

  private findCorners(): void {
    const sortedX: Vector[] = immutableObjectSort(this.points, 'x');
    const sortedY: Vector[] = immutableObjectSort(this.points, 'y');

    const firstX = sortedX[0];
    const firstY = sortedY[0];
    const lastX = sortedX[sortedX.length - 1];
    const lastY = sortedY[sortedY.length - 1];

    this.topLeft = new Vector({ x: firstX.x, y: firstY.y });
    this.topRight = new Vector({ x: lastX.x, y: firstY.y });
    this.bottomRight = new Vector({ x: lastX.x, y: lastY.y });
    this.bottomLeft = new Vector({ x: firstX.x, y: lastY.y });
  }

  private makeLines(): void {
    this.top = new Line(this.topLeft, this.topRight);
    this.right = new Line(this.topRight, this.bottomRight);
    this.bottom = new Line(this.bottomRight, this.bottomLeft);
    this.left = new Line(this.bottomLeft, this.topLeft);
  }

  private findLimits(): void {
    const top: Vector = this.topLeft.midpoint(this.topRight);
    const bottom: Vector = this.bottomLeft.midpoint(this.bottomRight);
    const left: Vector = this.topLeft.midpoint(this.bottomLeft);
    const right: Vector = this.topRight.midpoint(this.bottomRight);
    this.limits = { top, bottom, left, right };
  }
}
