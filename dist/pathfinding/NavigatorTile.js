import NavigatorData from './NavigatorData';
import { contains, uniqueId, removeFromArray, findIndex } from '../util';
export default class NavigatorTile {
    constructor(position) {
        this.position = position;
        this.id = uniqueId();
        this.isObstacle = false;
        this.navigators = [];
    }
    registerNavigatorData(navigator) {
        const navigationData = new NavigatorData(navigator);
        if (contains(this.navigators, navigationData)) {
            return false;
        }
        this.navigators.push(navigationData);
        return true;
    }
    deregisterNavigatorData(navigator) {
        const navData = this.getNavigatorData(navigator);
        return removeFromArray(this.navigators, navData);
    }
    getNavigatorData(navigator) {
        const index = findIndex(this.navigators, navigator);
        if (index !== -1) {
            return this.navigators[index];
        }
        const data = new NavigatorData(navigator);
        this.navigators.push(data);
        return data;
    }
    isDiagonal({ position }) {
        return this.position.x !== position.x && this.position.y !== position.y;
    }
}
//# sourceMappingURL=NavigatorTile.js.map