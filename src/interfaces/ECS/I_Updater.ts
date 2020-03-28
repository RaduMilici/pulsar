import I_Entity from './I_Entity';
import I_Component from './I_Component';
import I_GameObject from './I_GameObject';
import { updaterReport } from '../../types';

export default interface I_Updater extends I_Entity {
  onUpdateComplete: I_Component;

  clear(): void;
  add(gameObject: I_GameObject): updaterReport[];
  add(component: I_Component): boolean;
  remove(entity: I_GameObject): updaterReport[];
  remove(component: I_Component): boolean;
  toggle(entity: I_GameObject): updaterReport[];
  toggle(component: I_Component): boolean;
  invoke(component: I_Component, time: number): void;
  invokeRepeating(component: I_Component, time: number, times: number): void;
}
