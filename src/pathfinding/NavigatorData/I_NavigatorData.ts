import id from '../../interfaces/id';
import I_NavigatorTile from '../NavigatorTile/I_NavigatorTile';

export default interface I_NavigatorData extends id {
  hVal: number;
  gVal: number;
  fVal: number;
  parent: I_NavigatorTile;
}
