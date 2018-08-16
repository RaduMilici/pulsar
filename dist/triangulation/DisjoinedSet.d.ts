import id from '../interfaces/id';
import Vector from '../common/Vector';
export default class DisjoinedSet implements id {
  id: number;
  readonly points: Vector[];
  constructor(point: Vector);
  equals({ id }: DisjoinedSet): boolean;
  merge({ points }: DisjoinedSet): DisjoinedSet;
}
//# sourceMappingURL=DisjoinedSet.d.ts.map
