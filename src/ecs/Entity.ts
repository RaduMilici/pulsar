// import Component from './Component';
import Updater from './Updater/Updater';
import { I_Entity, I_Component, tickData } from '../interfaces';
import { uniqueId } from '../util';

export default class Entity implements I_Entity {
  updater: Updater;
  readonly id: string = uniqueId();
  readonly name: string;
  readonly components: I_Component[] = [];

  start(): void {}
  stop(): void {}
  update(tickData: tickData): void {}
}
