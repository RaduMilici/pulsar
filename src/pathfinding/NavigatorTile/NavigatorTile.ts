import Navigator from '../Navigator/Navigator';
import NavigatorData from '../NavigatorData';
import { Vector } from '../../common';
import { contains, uniqueId, removeFromArray, findIndex, XOR } from '../../util';
import { NAVIGATOR_DIAGONAL_COST, NAVIGATOR_VERTICAL_COST } from '../../constants';
import I_NavigatorTile from './I_NavigatorTile';

export default class NavigatorTile implements I_NavigatorTile {
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
    const fixedDistance: number = Number(distance.toFixed(1));
    return (
      fixedDistance === NAVIGATOR_VERTICAL_COST || fixedDistance === NAVIGATOR_DIAGONAL_COST
    );
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
