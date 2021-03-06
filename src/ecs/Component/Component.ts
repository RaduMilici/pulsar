import I_Component from './I_Component';
import I_GameObject from '../GameObject/I_GameObject';
import Entity from '../Entity/Entity';
import { componentSettings, tickData } from '../../types';

export default abstract class Component extends Entity implements I_Component {
  public parent: I_GameObject;
  readonly updatePriority: number;

  protected constructor({ name, updatePriority = null }: componentSettings) {
    super({ name });
    this.updatePriority = updatePriority;
  }

  update(tickData: tickData): void {}
}
