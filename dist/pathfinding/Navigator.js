import { uniqueId, contains } from '../util';
export default class Navigator {
    constructor({ grid, begin, end, onExplore, onComplete, maxSteps, }) {
        this.id = uniqueId();
        this._path = [];
        this.verticalCost = 1;
        this.diagonalCost = 1.4;
        this.tiles = [];
        this.open = [];
        this.closed = [];
        this.registeredTiles = [];
        this.steps = 0;
        this.grid = grid;
        this.begin = begin;
        this.end = end;
        this.onExplore = onExplore || (() => { });
        this.onComplete = onComplete || (() => { });
        this.maxSteps = maxSteps !== undefined ? maxSteps : Infinity;
    }
    get path() {
        return this._path;
    }
    /** Begin the pathfinding process. Does not start if destination is an obstacle. */
    start() {
        if (this.end.isObstacle) {
            return false;
        }
        this.closed.push(this.begin);
        const beginNavData = this.begin.getNavigatorData(this);
        this.addToExplored(this.begin);
        beginNavData.gVal = 0;
        this.calculateG(this.begin);
        return true;
    }
    deregisterNavigatorData() {
        this.registeredTiles.forEach((tile) => tile.deregisterNavigatorData(this));
    }
    calculateH(tile) {
        const colVal = Math.abs(tile.position.x - this.end.position.x);
        const rowVal = Math.abs(tile.position.y - this.end.position.y);
        return colVal + rowVal;
    }
    calculateG(tile) {
        const tileNavData = tile.getNavigatorData(this);
        this.addToExplored(tile);
        if (++this.steps === this.maxSteps) {
            this.done([]);
            return;
        }
        for (let i = 0; i < Navigator.neighborsCount; i++) {
            const x = tile.position.x + Navigator.getColOffset(i);
            const y = tile.position.y + Navigator.getRowOffset(i);
            const exploring = this.grid.findTile({ x, y });
            if (!exploring) {
                continue;
            }
            const exploringNavData = exploring.getNavigatorData(this);
            this.addToExplored(exploring);
            if (exploring.isObstacle) {
                continue;
            }
            if (contains(this.closed, exploring)) {
                continue;
            }
            if (tile.id === exploring.id) {
                this.closed.push(exploring);
            }
            else {
                if (!this.getParent(tile, exploring, tileNavData, exploringNavData)) {
                    continue;
                }
                if (!contains(this.open, exploring)) {
                    this.open.push(exploring);
                }
                if (tile.isDiagonal(exploring)) {
                    exploringNavData.gVal = tileNavData.gVal + this.diagonalCost;
                }
                else {
                    exploringNavData.gVal = tileNavData.gVal + this.verticalCost;
                }
            }
            exploringNavData.fVal = this.calculateF(exploring, exploringNavData);
        }
        const next = this.chooseNext();
        if (next) {
            this.onExplore(next);
            this.calculateG(next);
        }
        else {
            const path = this.getPath();
            this.done(path);
        }
    }
    done(path) {
        this.deregisterNavigatorData();
        this.onComplete(path);
    }
    calculateF(tile, data) {
        const hVal = this.calculateH(tile);
        return data.gVal + hVal;
    }
    static getRowOffset(iteration) {
        /*
           iteration = 0, 1, or 2: [-1][-1][-1]
           iteration = 3, 4, or 5: [ 0][ 0][ 0]
           iteration = 6, 7, or 8: [+1][+1][+1]
         */
        return Navigator.neighborsCount + -Math.floor((32 - iteration) / 3);
    }
    static getColOffset(iteration) {
        /*
           iteration = 0, 1, or 2: [-1][ 0][+1]
           iteration = 3, 4, or 5: [-1][ 0][+1]
           iteration = 6, 7, or 8: [-1][ 0][+1]
         */
        return (iteration % 3) - 1;
    }
    getParent(tile, checkTile, tileNavData, checkNavData) {
        if (!checkNavData.parent) {
            checkNavData.parent = tile;
            return tile;
        }
        const moveCost = tile.isDiagonal(checkTile)
            ? this.diagonalCost
            : this.verticalCost;
        if (tileNavData.gVal + moveCost < checkNavData.gVal) {
            checkNavData.parent = tile;
            return tile;
        }
        return null;
    }
    chooseNext() {
        this.open.sort((a, b) => {
            const aNavData = a.getNavigatorData(this);
            const bNavData = b.getNavigatorData(this);
            return aNavData.fVal - bNavData.fVal;
        });
        const next = this.open[0];
        if (!next) {
            return null;
        }
        this.open.shift();
        this.closed.push(next);
        if (next.id === this.end.id) {
            return null;
        }
        return next;
    }
    getPath() {
        this._path = [];
        let current = this.end;
        while (current.id !== this.begin.id) {
            const currentNavData = current.getNavigatorData(this);
            this._path.push(current);
            if (currentNavData.parent) {
                current = currentNavData.parent;
            }
            else {
                return [];
            }
        }
        this._path.reverse();
        return this._path;
    }
    addToExplored(tile) {
        if (!contains(this.registeredTiles, tile)) {
            this.registeredTiles.push(tile);
        }
    }
}
Navigator.neighborsCount = 9;
//# sourceMappingURL=Navigator.js.map