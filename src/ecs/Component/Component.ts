import { I_Component, I_GameObject } from '../../interfaces';
import { componentSettings, tickData } from '../../types';
import Entity from '../Entity';

export default abstract class Component extends Entity implements I_Component {
  public parent: I_GameObject;
  readonly updatePriority: number;

  constructor({ name, updatePriority = null }: componentSettings) {
    super({ name });
    this.updatePriority = updatePriority;
  }

  update(tickData: tickData): void {}
}
