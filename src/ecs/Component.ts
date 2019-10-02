import Updater from './Updater/Updater';
import { id, tickData, Update } from '../interfaces';
import { uniqueId } from '../util';
import Entity from './Entity';

export default class Component implements id, Update {
  readonly id: string = uniqueId();
  name: string;
  updater: Updater;
  entity: Entity;
  updatePriority: number | null = null;

  start(): void {}

  stop(): void {}

  update(tickData: tickData): void {}
}
