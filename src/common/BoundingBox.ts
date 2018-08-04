import Vector from './Vector';
import Line from './Line';
import limits from '../interfaces/limits';
import { immutableObjectSort } from '../util/sort';

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

  readonly lines: Line[];
  readonly limits: limits;

  constructor(private readonly points: Vector[]) {
    this.findCorners();
    this.lines = this.makeLines();
    this.limits = this.getLimits();
  }

  get midpoints(): limits {
    return this.limits;
  }

  get area(): number {
    return this.topRight.x - this.topLeft.x;
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

  private makeLines(): Line[] {
    const top: Line = new Line(this.topLeft, this.topRight);
    const right: Line = new Line(this.topRight, this.bottomRight);
    const bottom: Line = new Line(this.bottomRight, this.bottomLeft);
    const left: Line = new Line(this.bottomLeft, this.topLeft);

    return [top, right, bottom, left];
  }

  private getLimits(): limits {
    const top: Vector = this.topLeft.midpoint(this.topRight);
    const bottom: Vector = this.bottomLeft.midpoint(this.bottomRight);
    const left: Vector = this.topLeft.midpoint(this.bottomLeft);
    const right: Vector = this.topRight.midpoint(this.bottomRight);

    return { top, bottom, left, right };
  }
}
