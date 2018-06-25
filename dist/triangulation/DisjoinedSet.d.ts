import id from '../interfaces/id';
import Vector from './Vector';
export default class DisjoinedSet implements id {
  id: number;
  readonly points: Vector[];
  constructor(point: Vector);
  equals(set: DisjoinedSet): boolean;
  merge(set: DisjoinedSet): DisjoinedSet;
}
//# sourceMappingURL=DisjoinedSet.d.ts.map
