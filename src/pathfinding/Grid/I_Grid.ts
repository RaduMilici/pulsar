import Obstacles from '../Obstacles';
import { I_NavigatorTile } from '../NavigatorTile';
import { row, point } from '../../interfaces';

export default interface Grid {
  readonly obstacles: Obstacles;
  readonly tiles: row;
  readonly rows: row[];

  getTile({ x, y }: point): I_NavigatorTile | null;
  getRandomTile(): I_NavigatorTile;
  getRandomFreeTile(): I_NavigatorTile | null;
}
