import { id } from '../interfaces';
import Navigator from './Navigator';
import NavigatorData from './NavigatorData';
import { Vector } from '../common';
export default class NavigatorTile implements id {
    readonly position: Vector;
    id: number;
    isObstacle: boolean;
    private navigators;
    constructor(position: Vector);
    registerNavigatorData(navigator: Navigator): boolean;
    deregisterNavigatorData(navigator: Navigator): boolean;
    getNavigatorData(navigator: Navigator): NavigatorData;
    isDiagonal({ position }: NavigatorTile): boolean;
}
//# sourceMappingURL=NavigatorTile.d.ts.map