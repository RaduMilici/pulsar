import { id, point } from '../interfaces';
import Navigator from './Navigator';
import NavigatorData from './NavigatorData';
import { contains, uniqueId, removeFromArray } from '../util';
import { Vector } from '../common';

export default class NavigatorTile implements id {
  id: number = uniqueId();
  isObstacle: boolean = false;

  private navigators: NavigatorData[] = [];

  constructor(readonly position: Vector) {}

  registerNavigatorData(navigator: Navigator): boolean {
    const navigationData: NavigatorData = new NavigatorData(navigator);

    if (contains(this.navigators, navigationData)) {
      return false;
    }

    this.navigators.push(navigationData);
    return true;
  }

  unregisterNavigatorData(navigator: Navigator): boolean {
    const navData: NavigatorData = this.getNavigatorData(navigator);
    return removeFromArray(this.navigators, navData);
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
