import NavigatorTile from './NavigatorTile';
import { int } from '../util/random';
import Obstacles from './Obstacles';
const defaultSize = { width: 10, height: 10 };
export default class Grid {
    constructor(size = defaultSize) {
        this.size = size;
        this.tiles = [];
        this.rows = [];
        this.obstacles = new Obstacles(this);
        this.makeGrid();
    }
    randomTile() {
        const x = int(0, this.size.width - 1);
        const y = int(0, this.size.height - 1);
        return this.findTile({ x, y });
    }
    randomFreeTile() {
        return this.obstacles.getRandomOpen();
    }
    findTile(position) {
        return Grid.getTile(position, this.rows);
    }
    static getTile({ x, y }, list) {
        const row = list[y];
        return (row && row.length > x) ? row[x] : null;
    }
    makeGrid() {
        for (let y = 0; y < this.size.height; y++) {
            const row = [];
            for (let x = 0; x < this.size.width; x++) {
                const tile = new NavigatorTile({ x, y });
                this.tiles.push(tile);
                row.push(tile);
            }
            this.rows.push(row);
        }
    }
}
//# sourceMappingURL=Grid.js.map