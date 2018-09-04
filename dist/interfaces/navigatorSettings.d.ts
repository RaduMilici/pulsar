import { Grid, NavigatorTile } from '../pathfinding';
declare type navigatorSettings = {
    maxSteps?: number;
    grid: Grid;
    begin: NavigatorTile;
    end: NavigatorTile;
    onExplore?: (tile: NavigatorTile) => void;
    onComplete?: (path: NavigatorTile[]) => void;
};
export default navigatorSettings;
//# sourceMappingURL=navigatorSettings.d.ts.map