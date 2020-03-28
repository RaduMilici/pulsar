import I_GameObject from './I_GameObject';
import { I_Component } from '../Component'; 
import { Entity } from '../Entity';
import { contains, removeFromArray } from '../../util';

export default abstract class GameObject extends Entity implements I_GameObject {
  readonly components: I_Component[] = [];

  addComponent(component: I_Component): boolean {
    if (contains(this.components, component)) {
      return false;
    }

    component.parent = this;
    this.components.push(component);
    return true;
  }

  removeComponent(component: I_Component): boolean {
    component.parent = null;
    return removeFromArray(this.components, component);
  }
}
