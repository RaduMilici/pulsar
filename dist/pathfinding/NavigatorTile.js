import uniqueId from '../util/uniqueID';
import { contains } from '../util/id';
import NavigatorData from './NavigatorData';
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
    getNavigatorData(navigator) {
        const navData = this.navigators.find((navigationData) => {
            return navigationData.navigator.id === navigator.id;
        });
        return navData ? navData : null;
    }
    isDiagonal({ position }) {
        return (this.position.x !== position.x &&
            this.position.y !== position.y);
    }
}
//# sourceMappingURL=NavigatorTile.js.map