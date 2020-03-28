import I_Obstacles from '../Obstacles/I_Obstacles';
import I_NavigatorTile from '../NavigatorTile/I_NavigatorTile';
import row from '../../interfaces/row';
import point from '../../interfaces/point';

export default interface I_Grid {
  readonly obstacles: I_Obstacles;
  readonly tiles: row;
  readonly rows: row[];

  getTile({ x, y }: point): I_NavigatorTile | null;
  getRandomTile(): I_NavigatorTile;
  getRandomFreeTile(): I_NavigatorTile | null;
}
