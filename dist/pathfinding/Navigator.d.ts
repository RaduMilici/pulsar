import NavigatorTile from './NavigatorTile';
import row from '../interfaces/row';
import Grid from './Grid';
import id from '../interfaces/id';
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
  private neighborsCount;
  private tiles;
  private open;
  private closed;
  private current;
  constructor(
    grid: Grid,
    begin: NavigatorTile,
    end: NavigatorTile,
    onExplore?: onExplore,
    onComplete?: onComplete
  );
  readonly path: row;
  start(): void;
  private addOpenTiles;
  private calculateH;
  private calculateG;
  private calculateF;
  private getRowOffset;
  private static getColOffset;
  private static isDiagonal;
  private getParent;
  private chooseNext;
  private getPath;
  private static defaultOnComplete;
}
export {};
//# sourceMappingURL=Navigator.d.ts.map
