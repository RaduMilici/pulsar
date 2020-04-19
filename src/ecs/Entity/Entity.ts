import I_Entity from './I_Entity';
import { name } from '../../types';
import uniqueId from '../../util/uniqueID';

export default abstract class Entity implements I_Entity {
  readonly id: string = uniqueId();
  readonly name: string;

  constructor({ name }: name) {
    this.name = name;
  }

  start(): void {}
  stop(): void {}
}
