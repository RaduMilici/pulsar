import { id } from '../interfaces';
import Navigator from './Navigator';
import NavigatorData from './NavigatorData';
import { contains, uniqueId, removeFromArray, findIndex, XOR } from '../util';
import { Vector } from '../common';

export default class NavigatorTile implements id {
  id: string = uniqueId();
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

  deregisterNavigatorData(navigator: Navigator): boolean {
    const navData: NavigatorData = this.getNavigatorData(navigator);
    return removeFromArray(this.navigators, navData);
  }

  getNavigatorData(navigator: Navigator): NavigatorData {
    const index: number = findIndex(this.navigators, navigator);

    if (index !== -1) {
      return this.navigators[index];
    }

    const data: NavigatorData = new NavigatorData(navigator);
    this.navigators.push(data);
    return data;
  }

  distanceTo({ position }: NavigatorTile): number {
    return this.position.distanceTo(position);
  }

  equals({ position }: NavigatorTile): boolean {
    return this.position.equals(position);
  }

  isNeighbour({ position }: NavigatorTile): boolean {
    const distance: number = this.position.distanceTo(position);
    return Math.round(distance) === 1;
  }

  isDiagonal(tile: NavigatorTile): boolean {
    const isNeighbour: boolean = this.isNeighbour(tile);
    const hasDifferentX: boolean = this.position.x !== tile.position.x;
    const hasDifferentY: boolean = this.position.y !== tile.position.y;
    return isNeighbour && hasDifferentX && hasDifferentY;
  }

  isAdjacent(tile: NavigatorTile): boolean {
    const isNeighbour: boolean = this.isNeighbour(tile);
    const hasSameX: boolean = this.position.x === tile.position.x;
    const hasSameY: boolean = this.position.y === tile.position.y;
    return isNeighbour && XOR(hasSameX, hasSameY);
  }
}
