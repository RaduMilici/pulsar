import I_Vector from '../common/Vector/I_Vector';
import Shape from '../common/Shape/Shape';
import Vector from '../common/Vector/Vector';

export default class QuadTree {
  parent: QuadTree;

  readonly children: QuadTree[] = [];
  readonly containedPoints: I_Vector[] = [];

  private capacity: number = 1;

  constructor(public shape: Shape, private points: I_Vector[], public level: number = 0) {
    for (let point of points) {

      if (!this.shape.containsPoint(point)) {
        continue;
      }

      if (this.containedPoints.length < this.capacity) {
        this.containedPoints.push(point);
      } else {
        this.containedPoints.length = 0;
        this.divide(points);
        break;
      }
    }
  }

  getLevel(level: number): QuadTree[] | null {
    let children: QuadTree[] = [this];

    for (let i = 0; i < level; i++) {
      children = children.reduce(
        (acc: QuadTree[], quadTree: QuadTree) => [...acc, ...quadTree.children],
        []
      );
    }

    return children.length ? children : null;
  }

  findChildThatContains(point: I_Vector): QuadTree {
    const contains: boolean = this.shape.containsPoint(point);
    const hasChildren: boolean = this.children.length > 0;

    if (!contains) {
      return null;
    }

    if (hasChildren) {
      return this.children.find(
        (child: QuadTree) => child.findChildThatContains(point) !== null
      );
    } else {
      return this;
    }
  }

  forceDivide(times: number): void {
    for (let i = 0; i < times; i++) {
      const children: QuadTree[] = this.getLevel(i);

      children.forEach((child: QuadTree) => {
        if (!child.children.length) {
          child.divide(child.points);
        }
      });
    }
  }

  divide(points: I_Vector[]): void {
    const { topLeft, topRight, bottomLeft, bottomRight } = this.shape.boundingBox;
    const { top, bottom, left, right } = this.shape.boundingBox.midpoints;
    const centroid: I_Vector = Vector.FindPolyCentroid([top, bottom, left, right]);

    const nextLevel: number = this.level + 1;

    const shape1: Shape = new Shape([topLeft, top, centroid, left]);
    const quad1: QuadTree = new QuadTree(shape1, points, nextLevel);

    const shape2: Shape = new Shape([top, topRight, right, centroid]);
    const quad2: QuadTree = new QuadTree(shape2, points, nextLevel);

    const shape3: Shape = new Shape([centroid, right, bottomRight, bottom]);
    const quad3: QuadTree = new QuadTree(shape3, points, nextLevel);

    const shape4: Shape = new Shape([centroid, bottom, bottomLeft, left]);
    const quad4: QuadTree = new QuadTree(shape4, points, nextLevel);

    this.children.push(quad1, quad2, quad3, quad4);

    this.children.forEach((child: QuadTree) => (child.parent = this));
  }
}
