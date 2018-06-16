import id from '../interfaces/id';
import uniqueId from '../util/uniqueID';
import point from '../interfaces/point';
import Navigator from './Navigator';
import { contains } from '../util/id';
import NavigatorData from './NavigatorData';

export default class NavigatorTile implements id {
  id: number = uniqueId();
  isObstacle: boolean = false;
  private navigators: NavigatorData[] = [];

  constructor(readonly position: point) {}

  registerNavigatorData(navigator: Navigator): boolean {
    const navigationData: NavigatorData = new NavigatorData(navigator);

    if (contains(this.navigators, navigationData)) {
      return false;
    }

    this.navigators.push(navigationData);
    return true;
  }

  getNavigatorData(navigator: Navigator): NavigatorData | null {
    const navData = this.navigators.find((navigationData: NavigatorData) => {
      return navigationData.navigator.id === navigator.id;
    });

    return navData ? navData : null;
  }
}
