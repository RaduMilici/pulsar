import { I_Component, I_GameObject } from '../interfaces';
import { uniqueId } from '../util';

export default abstract class GameObject implements I_GameObject {
  readonly id: string = uniqueId();
  readonly name: string;
  readonly components: I_Component[] = [];

  start(): void {}
  stop(): void {}
}
