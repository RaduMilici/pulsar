import { I_NavigatorTile } from '../pathfinding/NavigatorTile';

type onExplore = (tile: I_NavigatorTile) => void;
type onComplete = (path: I_NavigatorTile[]) => void;

export { onExplore, onComplete };
