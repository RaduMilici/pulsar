import Navigator from './Navigator';
import id from '../interfaces/id';
import NavigatorTile from './NavigatorTile';
export default class NavigatorData implements id {
  readonly navigator: Navigator;
  id: number;
  gVal: number;
  hVal: number;
  fVal: number;
  parent: NavigatorTile;
  constructor(navigator: Navigator);
}
//# sourceMappingURL=NavigatorData.d.ts.map
