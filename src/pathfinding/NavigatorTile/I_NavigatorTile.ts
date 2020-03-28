import Navigator from '../Navigator';
import NavigatorData from '../NavigatorData';
import { id } from '../../interfaces';
import { Vector } from '../../common';

export default interface I_NavigatorTile extends id {
  id: string;
  isObstacle: boolean;
  readonly position: Vector;

  registerNavigatorData(navigator: Navigator): boolean;
  deregisterNavigatorData(navigator: Navigator): boolean;
  getNavigatorData(navigator: Navigator): NavigatorData;
  distanceTo({ position }: I_NavigatorTile): number;
  equals({ position }: I_NavigatorTile): boolean;
  isNeighbour({ position }: I_NavigatorTile): boolean;
  isDiagonal(tile: I_NavigatorTile): boolean;
  isAdjacent(tile: I_NavigatorTile): boolean;
}
