import Entity from './Entity';
import { I_Component, I_Entity, tickData } from '../interfaces';

export default class Component extends Entity implements I_Component {
  entity: I_Entity;
  updatePriority: number | null = null;

  update(tickData: tickData): void {}
}
