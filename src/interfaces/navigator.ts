import { NavigatorTile } from '../pathfinding';

type onExplore = (tile: NavigatorTile) => void;
type onComplete = (path: NavigatorTile[]) => void;

export { onExplore, onComplete };
