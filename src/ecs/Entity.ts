import Component from './Component';
import Updater from './Updater/Updater';
import { id } from '../interfaces';
import { uniqueId } from '../util';

export default class Entity implements id {
  id: number;
  updater: Updater;
  readonly components: Component[] = [];

  constructor() {
    this.id = uniqueId();
  }
}
