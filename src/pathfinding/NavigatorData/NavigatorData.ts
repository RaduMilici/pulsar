import { id } from '../../interfaces';
import I_Navigator from '../Navigator/I_Navigator';
import I_NavigatorTile from '../NavigatorTile/I_NavigatorTile';

export default class NavigatorData implements id {
  id: string;
  hVal: number; // distance from end
  gVal: number; // distance from start
  fVal: number; // gCost + hCost
  parent: I_NavigatorTile;

  constructor(public readonly navigator: I_Navigator) {
    this.id = navigator.id;
  }
}
