import Obstacles from './Obstacles';
import NavigatorTile from './NavigatorTile';
import { row, point, size } from '../interfaces';
declare type onTileCreate = (tile: NavigatorTile) => void;
export default class Grid {
    private size;
    onTileCreate: onTileCreate;
    readonly obstacles: Obstacles;
    readonly tiles: NavigatorTile[];
    readonly rows: row[];
    constructor(size?: size);
    /** Returns a random tile, can be an obstacle or not. */
    randomTile(): NavigatorTile;
    /** Returns a random non-obstacle tile, if it exists. */
    randomFreeTile(): NavigatorTile | null;
    /** Returns a tile at the specified coordinates. */
    findTile({ x, y }: point): NavigatorTile | null;
    makeGrid(): void;
}
export {};
//# sourceMappingURL=Grid.d.ts.map