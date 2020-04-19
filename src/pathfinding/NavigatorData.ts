import { id } from '../interfaces';
import { uniqueId } from '../util';
import Navigator from './Navigator';
import NavigatorTile from './NavigatorTile';

export default class NavigatorData implements id {
  id: number;
  hVal: number; // distance from end
  gVal: number; // distance from start
  fVal: number; // gCost + hCost
  parent: NavigatorTile;

  constructor(public readonly navigator: Navigator) {
    this.id = navigator.id;
  }
}
