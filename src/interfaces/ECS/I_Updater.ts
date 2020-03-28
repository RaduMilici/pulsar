import I_Entity from './I_Entity';
import I_GameObject from './I_GameObject';

export default interface I_Updater extends I_Entity {
  clear(): void;
  add(gameObject: I_GameObject): boolean;
  remove(gameObject: I_GameObject): boolean;
}
