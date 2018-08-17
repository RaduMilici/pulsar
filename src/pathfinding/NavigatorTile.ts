import { id, point } from '../interfaces';
import Navigator from './Navigator';
import NavigatorData from './NavigatorData';
import { contains, uniqueId } from '../util';

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

  isDiagonal({ position }: NavigatorTile): boolean {
    return this.position.x !== position.x && this.position.y !== position.y;
  }
}
