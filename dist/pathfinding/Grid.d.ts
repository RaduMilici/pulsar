import NavigatorTile from './NavigatorTile';
import size from '../interfaces/size';
import Vector from '../triangulation/Vector';
import row from '../interfaces/row';
import Obstacles from './Obstacles';
export default class Grid {
    private size;
    readonly tiles: NavigatorTile[];
    readonly rows: row[];
    readonly obstacles: Obstacles;
    constructor(size?: size);
    /** Returns a random tile, obstacle or not. */
    randomTile(): NavigatorTile;
    /** Returns a random non-obstacle tile, if it exists. */
    randomFreeTile(): NavigatorTile | null;
    /** Returns a tile at the specified coordinates. */
    findTile({ x, y }: Vector): NavigatorTile | null;
    private makeGrid;
}
//# sourceMappingURL=Grid.d.ts.map