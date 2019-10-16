import { I_Component, I_GameObject } from '../interfaces';
import { componentSettings, tickData } from '../types';
import { uniqueId } from '../util';

export default abstract class Component implements I_Component {
  public parent: I_GameObject;

  readonly id: string = uniqueId();
  readonly name: string;
  readonly updatePriority: number | null;

  constructor({ name, updatePriority = null }: componentSettings) {
    this.name = name;
    this.updatePriority = updatePriority;
  }

  start(): void {}
  stop(): void {}
  update(tickData: tickData): void {}
}
