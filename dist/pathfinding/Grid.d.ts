import Obstacles from './Obstacles';
import NavigatorTile from './NavigatorTile';
import { row, point, size } from '../interfaces';
export default class Grid {
    private size;
    readonly tiles: NavigatorTile[];
    readonly rows: row[];
    readonly obstacles: Obstacles;
    constructor(size?: size);
    /** Returns a random tile, can be an obstacle or not. */
    randomTile(): NavigatorTile;
    /** Returns a random non-obstacle tile, if it exists. */
    randomFreeTile(): NavigatorTile | null;
    /** Returns a tile at the specified coordinates. */
    findTile({ x, y }: point): NavigatorTile | null;
    private makeGrid;
}
//# sourceMappingURL=Grid.d.ts.map