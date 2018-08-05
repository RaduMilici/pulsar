import Updater from './Updater';
import { id, tickData, Update } from '../interfaces';
import { uniqueId } from '../util';

export default class Component implements id, Update {
  updater: Updater;
  readonly id: number;

  constructor() {
    this.id = uniqueId();
  }

  start(): void {}

  stop(): void {}

  update(tickData: tickData): void {}
}
