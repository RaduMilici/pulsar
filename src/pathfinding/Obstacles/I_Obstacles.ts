import { I_NavigatorTile } from '../NavigatorTile';
import { row } from '../../interfaces';

export default interface I_Obstacles {
  list: I_NavigatorTile[];
  add(tile: I_NavigatorTile): boolean;
  remove(tile: I_NavigatorTile): boolean;
  addRandom(count: number): I_NavigatorTile | row | null;
  removeRandom(count: number): I_NavigatorTile | row | null;
  getRandomOpen(): I_NavigatorTile | null;
}
