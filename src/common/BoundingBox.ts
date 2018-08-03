import Vector from './Vector';
import Line from './Line';
import { immutableObjectSort } from '../util/sort';

export default class BoundingBox {
  topLeft: Vector;
  topRight: Vector;
  bottomRight: Vector;
  bottomLeft: Vector;
  readonly lines: Line[];

  constructor(private readonly points: Vector[]) {
    this.findCorners();
    this.lines = this.makeLines();
  }

  private findCorners(): void {
    const sortedX: Vector[] = immutableObjectSort(this.points, 'x');
    const sortedY: Vector[] = immutableObjectSort(this.points, 'y');

    const firstX = sortedX[0];
    const lastX = sortedX[sortedX.length - 1];
    const firstY = sortedY[0];
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
}
