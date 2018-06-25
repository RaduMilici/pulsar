import uniqueId from '../util/uniqueID';
export default class DisjoinedSet {
    constructor(point) {
        this.id = uniqueId();
        point.set = this;
        this.points = [point];
    }
    equals(set) {
        return this.id === set.id;
    }
    merge(set) {
        set.points.forEach((point) => {
            point.set = this;
            this.points.push(point);
        });
        return this;
    }
}
//# sourceMappingURL=DisjoinedSet.js.map