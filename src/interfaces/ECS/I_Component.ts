import I_ECS_Object from './I_ECS_Object';
import I_Update from './I_Update';

export default interface I_Component extends I_ECS_Object, I_Update {
  readonly updatePriority: number | null;
}