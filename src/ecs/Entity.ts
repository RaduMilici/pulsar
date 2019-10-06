import { I_Entity } from '../interfaces';
import { uniqueId } from '../util';

export default class Entity implements I_Entity {
  readonly id: string = uniqueId();
  readonly name: string;

  start(): void {}
  stop(): void {}
}
