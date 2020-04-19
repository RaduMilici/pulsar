import I_Navigator from '../Navigator/I_Navigator';
import I_NavigatorData from '../NavigatorData/I_NavigatorData';
import I_NavigatorTile from './I_NavigatorTile';
import NavigatorData from '../NavigatorData/NavigatorData';
import Vector from '../../common/Vector';
import { contains, removeFromArray, findIndex } from '../../util/id';
import uniqueId from '../../util/uniqueID';
import XOR from '../../util/xor';
import { NAVIGATOR_DIAGONAL_COST, NAVIGATOR_VERTICAL_COST } from '../../constants';

export default class NavigatorTile implements I_NavigatorTile {
  id: string = uniqueId();
  isObstacle: boolean = false;

  private navigators: I_NavigatorData[] = [];

  constructor(readonly position: Vector) {}

  registerNavigatorData(navigator: I_Navigator): boolean {
    const navigationData: I_NavigatorData = new NavigatorData(navigator);

    if (contains(this.navigators, navigationData)) {
      return false;
    }

    this.navigators.push(navigationData);
    return true;
  }

  deregisterNavigatorData(navigator: I_Navigator): boolean {
    const navData: I_NavigatorData = this.getNavigatorData(navigator);
    return removeFromArray(this.navigators, navData);
  }

  getNavigatorData(navigator: I_Navigator): I_NavigatorData {
    const index: number = findIndex(this.navigators, navigator);

    if (index !== -1) {
      return this.navigators[index];
    }

    const data: I_NavigatorData = new NavigatorData(navigator);
    this.navigators.push(data);
    return data;
  }

  distanceTo({ position }: I_NavigatorTile): number {
    return this.position.distanceTo(position);
  }

  equals({ position }: I_NavigatorTile): boolean {
    return this.position.equals(position);
  }

  isNeighbour({ position }: I_NavigatorTile): boolean {
    const distance: number = this.position.distanceTo(position);
    const fixedDistance: number = Number(distance.toFixed(1));
    return (
      fixedDistance === NAVIGATOR_VERTICAL_COST || fixedDistance === NAVIGATOR_DIAGONAL_COST
    );
  }

  isDiagonal(tile: I_NavigatorTile): boolean {
    const isNeighbour: boolean = this.isNeighbour(tile);
    const hasDifferentX: boolean = this.position.x !== tile.position.x;
    const hasDifferentY: boolean = this.position.y !== tile.position.y;
    return isNeighbour && hasDifferentX && hasDifferentY;
  }

  isAdjacent(tile: I_NavigatorTile): boolean {
    const isNeighbour: boolean = this.isNeighbour(tile);
    const hasSameX: boolean = this.position.x === tile.position.x;
    const hasSameY: boolean = this.position.y === tile.position.y;
    return isNeighbour && XOR(hasSameX, hasSameY);
  }
}
