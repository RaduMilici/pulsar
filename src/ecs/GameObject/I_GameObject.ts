import I_Entity from '../Entity/I_Entity';
import I_Component from '../Component/I_Component';

export default interface I_GameObject extends I_Entity {
  readonly components: I_Component[];

  addComponent(component: I_Component): boolean;
  removeComponent(component: I_Component): boolean;
}
