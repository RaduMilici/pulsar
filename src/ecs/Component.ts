import Updater from './Updater/Updater';
import { id, tickData, Update } from '../interfaces';
import { uniqueId } from '../util';

export default class Component implements id, Update {
  name: string;
  updater: Updater;
  updatePriority: number | null = null;
  readonly id: number;

  constructor() {
    this.id = uniqueId();
  }

  start(): void {}

  stop(): void {}

  update(tickData: tickData): void {}
}
