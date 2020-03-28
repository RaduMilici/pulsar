import {I_Entity} from '../Entity';
import {I_Updatable} from '../Updater';

export default interface I_Component extends I_Entity, I_Updatable {
  parent: I_Entity;
  readonly updatePriority: number;
}
