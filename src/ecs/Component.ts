import Updater from './Updater/Updater';
import { tickData, I_Component, I_Entity } from '../interfaces';
import { uniqueId } from '../util';
// import Entity from './Entity';

export default class Component implements I_Component {
  updater: Updater;
  entity: I_Entity;
  readonly id: string = uniqueId();
  readonly name: string;
  readonly updatePriority: number | null = null;

  start(): void {}
  stop(): void {}
  update(tickData: tickData): void {}
}
