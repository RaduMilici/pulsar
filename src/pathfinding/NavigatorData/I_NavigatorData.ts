import { id } from '../../interfaces';
import I_NavigatorTile from '../NavigatorTile/I_NavigatorTile';

export default interface NavigatorData extends id {
  id: string;
  hVal: number;
  gVal: number;
  fVal: number;
  parent: I_NavigatorTile;
}
