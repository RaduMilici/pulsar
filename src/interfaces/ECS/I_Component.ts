import I_Entity from './I_Entity';
import I_Updatable from './I_Updatable';

export default interface I_Component extends I_Entity, I_Updatable {
  entity: I_Entity;
  updatePriority: number | null;
}
