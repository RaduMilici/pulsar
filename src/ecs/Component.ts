import Updater from './Updater/Updater';
import { id, tickData, Update } from '../interfaces';
import { uniqueId } from '../util';

export default class Component implements id, Update {
  readonly id: number = uniqueId();
  name: string;
  updater: Updater;
  updatePriority: number | null = null;

  start(): void {}

  stop(): void {}

  update(tickData: tickData): void {}
}
