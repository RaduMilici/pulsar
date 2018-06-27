import id from '../interfaces/id';
import Vector from '../triangulation/Vector';
import Navigator from './Navigator';
import NavigatorData from './NavigatorData';
export default class NavigatorTile implements id {
    readonly position: Vector;
    id: number;
    isObstacle: boolean;
    private navigators;
    constructor(position: Vector);
    registerNavigatorData(navigator: Navigator): boolean;
    getNavigatorData(navigator: Navigator): NavigatorData | null;
}
//# sourceMappingURL=NavigatorTile.d.ts.map