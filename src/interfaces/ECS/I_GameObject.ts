import I_ECS_Object from './I_Entity';
import I_Component from './I_Component';

export default interface I_GameObject extends I_ECS_Object {
  components: I_Component[];
}