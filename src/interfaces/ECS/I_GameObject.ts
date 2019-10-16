import I_Entity from './I_Entity';
import I_Component from './I_Component';

export default interface I_GameObject extends I_Entity {
  components: I_Component[];
}
