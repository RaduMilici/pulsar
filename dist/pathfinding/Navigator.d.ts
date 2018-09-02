import NavigatorTile from './NavigatorTile';
import { row, id } from '../interfaces';
import Grid from './Grid';
declare type onExplore = (tile: NavigatorTile) => void;
declare type onComplete = (path: NavigatorTile[]) => void;
export default class Navigator implements id {
    private grid;
    private begin;
    private end;
    private readonly onExplore;
    private readonly onComplete;
    id: number;
    private _path;
    private verticalCost;
    private diagonalCost;
    private static neighborsCount;
    private tiles;
    private open;
    private closed;
    constructor(grid: Grid, begin: NavigatorTile, end: NavigatorTile, onExplore?: onExplore, onComplete?: onComplete);
    readonly path: row;
    /** Begin the pathfinding process. Does not start if destination is an obstacle. */
    start(): boolean;
    private registerOpenTiles;
    private unregisterNavigatorData;
    private calculateH;
    private calculateG;
    private calculateF;
    static getRowOffset(iteration: number): number;
    static getColOffset(iteration: number): number;
    private getParent;
    private chooseNext;
    private getPath;
    private static defaultOnComplete;
}
export {};
//# sourceMappingURL=Navigator.d.ts.map