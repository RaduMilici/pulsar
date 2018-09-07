import { id } from '../interfaces';
import Navigator from './Navigator';
import NavigatorTile from './NavigatorTile';
export default class NavigatorData implements id {
    readonly navigator: Navigator;
    id: number;
    hVal: number;
    gVal: number;
    fVal: number;
    parent: NavigatorTile;
    constructor(navigator: Navigator);
}
//# sourceMappingURL=NavigatorData.d.ts.map