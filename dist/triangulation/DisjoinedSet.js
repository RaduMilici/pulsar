import { uniqueId } from '../util';
export default class DisjoinedSet {
    constructor(point) {
        this.id = uniqueId();
        this.points = [point];
    }
    equals({ id }) {
        return this.id === id;
    }
    merge({ points }) {
        points.forEach((point) => {
            point.set = this;
            this.points.push(point);
        });
        return this;
    }
}
//# sourceMappingURL=DisjoinedSet.js.map