import Vector from '../common/Vector';
import Line from '../common/Line';
import Triangulation from './Triangulation';
export default class Hull {
    readonly lines: Line[];
    private _points;
    private readonly triangles;
    constructor({ triangles }: Triangulation);
    readonly points: Vector[];
    start(): void;
}
//# sourceMappingURL=Hull.d.ts.map