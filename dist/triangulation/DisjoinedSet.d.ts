import { id } from '../interfaces';
import { Vector } from '../common';
export default class DisjoinedSet implements id {
    id: number;
    readonly points: Vector[];
    constructor(point: Vector);
    equals({ id }: DisjoinedSet): boolean;
    merge({ points }: DisjoinedSet): DisjoinedSet;
}
//# sourceMappingURL=DisjoinedSet.d.ts.map