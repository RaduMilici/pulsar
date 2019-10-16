import { I_Entity } from '../interfaces';
import { name } from '../types';
import { uniqueId } from '../util';

export default abstract class GameObject implements I_Entity {
  readonly id: string = uniqueId();
  readonly name: string;

  constructor({ name }: name) {
    this.name = name;
  }

  start(): void {}
  stop(): void {}
}
