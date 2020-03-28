import I_Entity from '../Entity/I_Entity';
import I_GameObject from '../GameObject/I_GameObject';

export default interface I_Updater extends I_Entity {
  clear(): void;
  add(gameObject: I_GameObject): boolean;
  remove(gameObject: I_GameObject): boolean;
}
