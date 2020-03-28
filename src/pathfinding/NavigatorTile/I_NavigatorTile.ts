import I_Navigator from '../Navigator/I_Navigator';
import I_NavigatorData from '../NavigatorData/I_NavigatorData';
import Vector from '../../common/Vector/Vector';
import { id } from '../../interfaces';

export default interface I_NavigatorTile extends id {
  id: string;
  isObstacle: boolean;
  readonly position: Vector;

  registerNavigatorData(navigator: I_Navigator): boolean;
  deregisterNavigatorData(navigator: I_Navigator): boolean;
  getNavigatorData(navigator: I_Navigator): I_NavigatorData;
  distanceTo({ position }: I_NavigatorTile): number;
  equals({ position }: I_NavigatorTile): boolean;
  isNeighbour({ position }: I_NavigatorTile): boolean;
  isDiagonal(tile: I_NavigatorTile): boolean;
  isAdjacent(tile: I_NavigatorTile): boolean;
}
