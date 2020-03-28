import { id } from '../interfaces';
import Navigator from './Navigator';
import { I_NavigatorTile } from './NavigatorTile';

export default class NavigatorData implements id {
  id: string;
  hVal: number; // distance from end
  gVal: number; // distance from start
  fVal: number; // gCost + hCost
  parent: I_NavigatorTile;

  constructor(public readonly navigator: Navigator) {
    this.id = navigator.id;
  }
}
