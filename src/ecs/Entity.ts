import Component from './Component';
import Updater from './Updater/Updater';
import { id } from '../interfaces';
import { uniqueId } from '../util';

export default class Entity implements id {
  id: number = uniqueId();
  name: string;
  updater: Updater;
  readonly components: Component[] = [];
}
