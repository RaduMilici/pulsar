import I_Grid from '../Grid/I_Grid';
import I_NavigatorTile from '../NavigatorTile/I_NavigatorTile';
import I_NavigatorData from '../NavigatorData/I_NavigatorData';
import I_Navigator from './I_Navigator';
import { contains } from '../../util/id';
import uniqueId from '../../util/uniqueID';
import { navigatorSettings, onExplore, onComplete } from '../../interfaces';
import {
  NO_OP,
  NAVIGATOR_MAX_STEPS,
  NAVIGATOR_VERTICAL_COST,
  NAVIGATOR_DIAGONAL_COST,
  TILE_NEIGHBORS_COUNT,
} from '../../constants';

export default class Navigator implements I_Navigator {
  readonly id: string = uniqueId();
  private verticalCost: number = NAVIGATOR_VERTICAL_COST;
  private diagonalCost: number = NAVIGATOR_DIAGONAL_COST;
  private _path: I_NavigatorTile[] = [];
  private open: I_NavigatorTile[] = [];
  private closed: I_NavigatorTile[] = [];
  private registeredTiles: I_NavigatorTile[] = [];
  private steps: number = 0;
  private grid: I_Grid;
  private readonly begin: I_NavigatorTile;
  private readonly end: I_NavigatorTile;
  private readonly onExplore: onExplore;
  private readonly onComplete: onComplete;
  private readonly maxSteps: number;

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

  get path(): I_NavigatorTile[] {
    return this._path;
  }

  /** Begin the pathfinding process. Does not start if destination is an obstacle. */
  start(): boolean {
    if (this.end.isObstacle) {
      return false;
    }
    this.closed.push(this.begin);
    const beginNavData: I_NavigatorData = this.begin.getNavigatorData(this);
    this.addToExplored(this.begin);

    beginNavData.gVal = 0;
    this.calculateG(this.begin);
    return true;
  }

  private deregisterNavigatorData(): void {
    this.registeredTiles.forEach((tile: I_NavigatorTile) =>
      tile.deregisterNavigatorData(this)
    );
  }

  private calculateH(tile: I_NavigatorTile): number {
    const colVal: number = Math.abs(tile.position.x - this.end.position.x);
    const rowVal: number = Math.abs(tile.position.y - this.end.position.y);
    return colVal + rowVal;
  }

  private calculateG(tile: I_NavigatorTile): void {
    const tileNavData: I_NavigatorData = tile.getNavigatorData(this);
    this.addToExplored(tile);

    if (++this.steps === this.maxSteps) {
      this.done([]);
      return;
    }

    for (let i = 0; i < TILE_NEIGHBORS_COUNT; i++) {
      const x: number = tile.position.x + Navigator.getColOffset(i);
      const y: number = tile.position.y + Navigator.getRowOffset(i);
      const exploring: I_NavigatorTile | null = this.grid.getTile({ x, y });

      if (!exploring) {
        continue;
      }

      this.addToExplored(exploring);

      if (exploring.isObstacle) {
        continue;
      }

      if (contains(this.closed, exploring)) {
        continue;
      }

      const exploringNavData: I_NavigatorData = exploring.getNavigatorData(this);

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
      const path: I_NavigatorTile[] = this.getPath();
      this.done(path);
    }
  }

  private done(path: I_NavigatorTile[]) {
    this.deregisterNavigatorData();
    this.onComplete(path);
  }

  private calculateF(tile: I_NavigatorTile, data: I_NavigatorData): number {
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
    tile: I_NavigatorTile,
    checkTile: I_NavigatorTile,
    tileNavData: I_NavigatorData,
    checkNavData: I_NavigatorData
  ): I_NavigatorTile | null {
    if (!checkNavData.parent) {
      checkNavData.parent = tile;
      return tile;
    }

    const moveCost = tile.isDiagonal(checkTile) ? this.diagonalCost : this.verticalCost;

    if (tileNavData.gVal + moveCost < checkNavData.gVal) {
      checkNavData.parent = tile;
      return tile;
    }

    return null;
  }

  private chooseNext(): I_NavigatorTile | null {
    this.open.sort((a: I_NavigatorTile, b: I_NavigatorTile) => {
      const aNavData: I_NavigatorData = a.getNavigatorData(this);
      const bNavData: I_NavigatorData = b.getNavigatorData(this);

      return aNavData.fVal - bNavData.fVal;
    });

    const next: I_NavigatorTile | undefined = this.open[0];

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

  private getPath(): I_NavigatorTile[] {
    this._path = [];
    let current: I_NavigatorTile = this.end;

    while (current.id !== this.begin.id) {
      const currentNavData: I_NavigatorData = current.getNavigatorData(this);
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

  private addToExplored(tile: I_NavigatorTile): void {
    if (!contains(this.registeredTiles, tile)) {
      this.registeredTiles.push(tile);
    }
  }
}
