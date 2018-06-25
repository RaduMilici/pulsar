import id from '../interfaces/id';
import uniqueId from '../util/uniqueID';
import Vector from './Vector';

export default class DisjoinedSet implements id {
  id: number = uniqueId();
  readonly points: Vector[];

  constructor(point: Vector) {
    point.set = this;
    this.points = [point];
  }

  equals(set: DisjoinedSet): boolean {
    return this.id === set.id;
  }

  merge(set: DisjoinedSet): DisjoinedSet {
    set.points.forEach((point: Vector) => {
      point.set = this;
      this.points.push(point);
    });

    return this;
  }
}
