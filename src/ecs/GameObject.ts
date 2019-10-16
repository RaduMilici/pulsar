import { I_Component, I_GameObject } from '../interfaces';
import { name } from '../types';
import { uniqueId } from '../util';

export default abstract class GameObject implements I_GameObject {
  readonly id: string = uniqueId();
  readonly name: string;
  readonly components: I_Component[] = [];

  constructor({ name }: name) {
    this.name = name;
  }

  start(): void {}
  stop(): void {}
}
