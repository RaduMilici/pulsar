import id from '../interfaces/id';
import { uniqueId } from '../util';
import I_Vector from '../common/Vector/I_Vector';

export default class DisjoinedSet implements id {
  id: string = uniqueId();
  readonly points: I_Vector[];

  constructor(point: I_Vector) {
    this.points = [point];
  }

  equals({ id }: DisjoinedSet): boolean {
    return this.id === id;
  }

  merge({ points }: DisjoinedSet): DisjoinedSet {
    points.forEach((point: I_Vector) => {
      point.set = this;
      this.points.push(point);
    });

    return this;
  }
}
