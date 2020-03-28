import I_Entity from '../Entity/I_Entity';
import I_Updatable from '../Updater/I_Updatable';

export default interface I_Component extends I_Entity, I_Updatable {
  parent: I_Entity;
  readonly updatePriority: number;
}
