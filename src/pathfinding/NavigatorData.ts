import id from '../interfaces/id';
import uniqueID from '../util/uniqueID';
import Navigator from './Navigator';
import NavigatorTile from './NavigatorTile';

export default class NavigatorData implements id {
  id: number = uniqueID();
  gVal: number; // distance from start
  hVal: number; // distance from end
  fVal: number; // gCost + hCost
  parent: NavigatorTile;

  constructor(public readonly navigator: Navigator) {}
}
