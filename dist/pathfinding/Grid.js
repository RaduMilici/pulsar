import Obstacles from './Obstacles';
import { randomInt } from '../util';
import NavigatorTile from './NavigatorTile';
import { Vector } from '../common';
const defaultSize = { width: 10, height: 10 };
export default class Grid {
    constructor(size = defaultSize) {
        this.size = size;
        this.onTileCreate = () => { };
        this.obstacles = new Obstacles(this);
        this.tiles = [];
        this.rows = [];
    }
    /** Returns a random tile, can be an obstacle or not. */
    randomTile() {
        const x = randomInt(0, this.size.width - 1);
        const y = randomInt(0, this.size.height - 1);
        return this.findTile({ x, y });
    }
    /** Returns a random non-obstacle tile, if it exists. */
    randomFreeTile() {
        return this.obstacles.getRandomOpen();
    }
    /** Returns a tile at the specified coordinates. */
    findTile({ x, y }) {
        const row = this.rows[y];
        return row && row.length > x ? row[x] : null;
    }
    makeGrid() {
        for (let y = 0; y < this.size.height; y++) {
            const row = [];
            for (let x = 0; x < this.size.width; x++) {
                const pos = new Vector({ x, y });
                const tile = new NavigatorTile(pos);
                this.onTileCreate(tile);
                this.tiles.push(tile);
                row.push(tile);
            }
            this.rows.push(row);
        }
    }
}
//# sourceMappingURL=Grid.js.map