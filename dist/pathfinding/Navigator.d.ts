import { row, id, navigatorSettings } from '../interfaces';
export default class Navigator implements id {
    id: number;
    private _path;
    private verticalCost;
    private diagonalCost;
    private static neighborsCount;
    private tiles;
    private open;
    private closed;
    private grid;
    private begin;
    private end;
    private onExplore;
    private onComplete;
    private maxSteps;
    private steps;
    constructor({ grid, begin, end, onExplore, onComplete, maxSteps, }: navigatorSettings);
    readonly path: row;
    /** Begin the pathfinding process. Does not start if destination is an obstacle. */
    start(): boolean;
    private registerOpenTiles;
    private unregisterNavigatorData;
    private calculateH;
    private calculateG;
    private done;
    private calculateF;
    static getRowOffset(iteration: number): number;
    static getColOffset(iteration: number): number;
    private getParent;
    private chooseNext;
    private getPath;
}
//# sourceMappingURL=Navigator.d.ts.map