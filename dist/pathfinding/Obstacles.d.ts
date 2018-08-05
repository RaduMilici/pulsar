import Grid from './Grid';
import NavigatorTile from './NavigatorTile';
import row from '../interfaces/row';
export default class Obstacles {
  private grid;
  private readonly openList;
  private readonly closedList;
  constructor(grid: Grid);
  readonly list: NavigatorTile[];
  add(tile: NavigatorTile): boolean;
  remove(tile: NavigatorTile): boolean;
  addRandom(count?: number): NavigatorTile | row | null;
  removeRandom(count?: number): NavigatorTile | row | null;
  getRandomOpen(): NavigatorTile | null;
  private getRandom;
  private manipulateMultipleRandom;
  private manipulateSingleRandom;
  private manipulate;
}
//# sourceMappingURL=Obstacles.d.ts.map
