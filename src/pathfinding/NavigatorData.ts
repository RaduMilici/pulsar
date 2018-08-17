import { id } from '../interfaces';
import { uniqueId } from '../util';
import Navigator from './Navigator';
import NavigatorTile from './NavigatorTile';

export default class NavigatorData implements id {
  id: number = uniqueId();
  gVal: number; // distance from start
  hVal: number; // distance from end
  fVal: number; // gCost + hCost
  parent: NavigatorTile;

  constructor(public readonly navigator: Navigator) {}
}
