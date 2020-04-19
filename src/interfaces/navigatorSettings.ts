import I_Grid from '../pathfinding/Grid/I_Grid';
import I_NavigatorTile from '../pathfinding/NavigatorTile/I_NavigatorTile';

type navigatorSettings = {
  maxSteps?: number;
  grid: I_Grid;
  begin: I_NavigatorTile;
  end: I_NavigatorTile;
  onExplore?: (tile: I_NavigatorTile) => void;
  onComplete?: (path: I_NavigatorTile[]) => void;
};

export default navigatorSettings;
