import { I_GameObject, I_Component } from '../interfaces';
import Entity from './Entity';

export default class GameObject extends Entity implements I_GameObject{
  components: I_Component[] = [];

  addComponent(component: I_Component): void {
    this.components.push(component);
  }
}