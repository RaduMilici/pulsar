import { Grid } from '../pathfinding';
import { I_NavigatorTile } from '../pathfinding/NavigatorTile';

type navigatorSettings = {
  maxSteps?: number;
  grid: Grid;
  begin: I_NavigatorTile;
  end: I_NavigatorTile;
  onExplore?: (tile: I_NavigatorTile) => void;
  onComplete?: (path: I_NavigatorTile[]) => void;
};

export default navigatorSettings;
