import Entity from './Entity';
import { I_Component, I_Entity } from '../interfaces';

export default class Component extends Entity implements I_Component {
  entity: I_Entity;

  update(): void {}
}
