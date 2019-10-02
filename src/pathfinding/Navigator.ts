import Grid from './Grid';
import NavigatorTile from './NavigatorTile';
import NavigatorData from './NavigatorData';
import { uniqueId, contains } from '../util';
import {
  row,
  id,
  navigatorSettings,
  onExplore,
  onComplete,
} from '../interfaces';
import {
  NO_OP,
  NAVIGATOR_MAX_STEPS,
  NAVIGATOR_VERTICAL_COST,
  NAVIGATOR_DIAGONAL_COST,
  TILE_NEIGHBORS_COUNT,
} from '../constants';

export default class Navigator implements id {
  readonly id: number = uniqueId();
  private verticalCost: number = NAVIGATOR_VERTICAL_COST;
  private diagonalCost: number = NAVIGATOR_DIAGONAL_COST;
  private _path: row = [];
  private open: row = [];
  private closed: row = [];
  private registeredTiles: row = [];
  private steps: number = 0;
  private grid: Grid;
  private begin: NavigatorTile;
  private end: NavigatorTile;
  private onExplore: onExplore;
  private onComplete: onComplete;
  private maxSteps: number;

  constructor({
    grid,
    begin,
    end,
    onExplore = NO_OP,
    onComplete = NO_OP,
    maxSteps = NAVIGATOR_MAX_STEPS,
  }: navigatorSettings) {
    this.grid = grid;
    this.begin = begin;
    this.end = end;
    this.onExplore = onExplore;
    this.onComplete = onComplete;
    this.maxSteps = maxSteps;
  }

  get path(): row {
    return this._path;
  }

  /** Begin the pathfinding process. Does not start if destination is an obstacle. */
  start(): boolean {
    if (this.end.isObstacle) {
      return false;
    }
    this.closed.push(this.begin);
    const beginNavData: NavigatorData = this.begin.getNavigatorData(this);
    this.addToExplored(this.begin);

    beginNavData.gVal = 0;
    this.calculateG(this.begin);
    return true;
  }

  private deregisterNavigatorData(): void {
    this.registeredTiles.forEach((tile: NavigatorTile) =>
      tile.deregisterNavigatorData(this)
    );
  }

  private calculateH(tile: NavigatorTile): number {
    const colVal: number = Math.abs(tile.position.x - this.end.position.x);
    const rowVal: number = Math.abs(tile.position.y - this.end.position.y);
    return colVal + rowVal;
  }

  private calculateG(tile: NavigatorTile): void {
    const tileNavData = tile.getNavigatorData(this);
    this.addToExplored(tile);

    if (++this.steps === this.maxSteps) {
      this.done([]);
      return;
    }

    for (let i = 0; i < TILE_NEIGHBORS_COUNT; i++) {
      const x: number = tile.position.x + Navigator.getColOffset(i);
      const y: number = tile.position.y + Navigator.getRowOffset(i);
      const exploring: NavigatorTile | null = this.grid.getTile({ x, y });

      if (!exploring) {
        continue;
      }

      const exploringNavData: NavigatorData = exploring.getNavigatorData(this);
      this.addToExplored(exploring);

      if (exploring.isObstacle) {
        continue;
      }

      if (contains(this.closed, exploring)) {
        continue;
      }

      if (tile.id === exploring.id) {
        this.closed.push(exploring);
      } else {
        if (!this.getParent(tile, exploring, tileNavData, exploringNavData)) {
          continue;
        }

        if (!contains(this.open, exploring)) {
          this.open.push(exploring);
        }

        if (tile.isDiagonal(exploring)) {
          exploringNavData.gVal = tileNavData.gVal + this.diagonalCost;
        } else {
          exploringNavData.gVal = tileNavData.gVal + this.verticalCost;
        }
      }

      exploringNavData.fVal = this.calculateF(exploring, exploringNavData);
    }

    const next = this.chooseNext();

    if (next) {
      this.onExplore(next);
      this.calculateG(next);
    } else {
      const path: NavigatorTile[] = this.getPath();
      this.done(path);
    }
  }

  private done(path: NavigatorTile[]) {
    this.deregisterNavigatorData();
    this.onComplete(path);
  }

  private calculateF(tile: NavigatorTile, data: NavigatorData): number {
    const hVal = this.calculateH(tile);
    return data.gVal + hVal;
  }

  static getRowOffset(iteration: number): number {
    /*
       iteration = 0, 1, or 2: [-1][-1][-1]
       iteration = 3, 4, or 5: [ 0][ 0][ 0]
       iteration = 6, 7, or 8: [+1][+1][+1]
     */
    return TILE_NEIGHBORS_COUNT + -Math.floor((32 - iteration) / 3);
  }

  static getColOffset(iteration: number): number {
    /*
       iteration = 0, 1, or 2: [-1][ 0][+1]
       iteration = 3, 4, or 5: [-1][ 0][+1]
       iteration = 6, 7, or 8: [-1][ 0][+1]
     */
    return (iteration % 3) - 1;
  }

  private getParent(
    tile: NavigatorTile,
    checkTile: NavigatorTile,
    tileNavData: NavigatorData,
    checkNavData: NavigatorData
  ): NavigatorTile | null {
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

  private chooseNext(): NavigatorTile | null {
    this.open.sort((a: NavigatorTile, b: NavigatorTile) => {
      const aNavData: NavigatorData = a.getNavigatorData(this);
      const bNavData: NavigatorData = b.getNavigatorData(this);

      return aNavData.fVal - bNavData.fVal;
    });

    const next: NavigatorTile | undefined = this.open[0];

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

  private getPath(): NavigatorTile[] {
    this._path = [];
    let current: NavigatorTile = this.end;

    while (current.id !== this.begin.id) {
      const currentNavData: NavigatorData = current.getNavigatorData(this);
      this._path.push(current);

      if (currentNavData.parent) {
        current = currentNavData.parent;
      } else {
        return [];
      }
    }

    this._path.reverse();
    return this._path;
  }

  private addToExplored(tile: NavigatorTile): void {
    if (!contains(this.registeredTiles, tile)) {
      this.registeredTiles.push(tile);
    }
  }
}
