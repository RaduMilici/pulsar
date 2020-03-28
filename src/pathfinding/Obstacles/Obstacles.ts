import {I_Grid} from '../Grid';
import { I_NavigatorTile } from '../NavigatorTile';
import { row } from '../../interfaces';
import { contains, findIndex, randomInt } from '../../util';
import I_Obstacles from './I_Obstacles';

export default class Obstacles implements I_Obstacles {
  private readonly openList: row = [];
  private readonly closedList: row = [];

  constructor({ tiles }: I_Grid) {
    this.openList = Array.from(tiles);
  }

  get list(): I_NavigatorTile[] {
    return this.closedList;
  }

  add(tile: I_NavigatorTile): boolean {
    //tile.isObstacle = true;
    return this.manipulate(true, tile);
  }

  remove(tile: I_NavigatorTile): boolean {
    //tile.isObstacle = false;
    return this.manipulate(false, tile);
  }

  addRandom(count: number = 1): I_NavigatorTile | row | null {
    return this.manipulateMultipleRandom(true, count);
  }

  removeRandom(count: number = 1): I_NavigatorTile | row | null {
    return this.manipulateMultipleRandom(false, count);
  }

  getRandomOpen(): I_NavigatorTile | null {
    return this.getRandom(true);
  }

  private getRandom(open: boolean): I_NavigatorTile | null {
    const list = open ? this.openList : this.closedList;
    const random: number = randomInt(0, list.length - 1);
    const tile = list[random];
    return tile ? tile : null;
  }

  private manipulateMultipleRandom(add: boolean, count: number): I_NavigatorTile | row | null {
    const tiles: row = [];

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const tile: I_NavigatorTile = this.manipulateSingleRandom(add);
        tiles.push(tile);
      }

      return count === 1 ? tiles[0] : tiles;
    }

    return null;
  }

  private manipulateSingleRandom(add: boolean): I_NavigatorTile | null {
    const tile = this.getRandom(add);

    if (tile) {
      this.manipulate(add, tile);
      return tile;
    }

    return null;
  }

  private manipulate(add: boolean, tile: I_NavigatorTile): boolean {
    const isInvalid: boolean = add ? tile.isObstacle : !tile.isObstacle;

    if (isInvalid) {
      return false;
    }

    let list: I_NavigatorTile[];
    let otherList: I_NavigatorTile[];

    if (add) {
      list = this.openList;
      otherList = this.closedList;
    } else {
      list = this.closedList;
      otherList = this.openList;
    }

    if (contains(list, tile)) {
      tile.isObstacle = add;
      const index = findIndex(list, tile);
      list.splice(index, 1);
      otherList.push(tile);
      return true;
    }

    return false;
  }
}
