import id from '../interfaces/id';
import uniqueId from '../util/uniqueID';
import Vector from '../common/Vector';

export default class DisjoinedSet implements id {
  id: number = uniqueId();
  readonly points: Vector[];

  constructor(point: Vector) {
    this.points = [point];
  }

  equals({ id }: DisjoinedSet): boolean {
    return this.id === id;
  }

  merge({ points }: DisjoinedSet): DisjoinedSet {
    points.forEach((point: Vector) => {
      point.set = this;
      this.points.push(point);
    });

    return this;
  }
}
