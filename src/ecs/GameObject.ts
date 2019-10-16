import { I_Component, I_GameObject } from '../interfaces';
import Entity from './Entity';

export default abstract class GameObject extends Entity
  implements I_GameObject {
  readonly components: I_Component[] = [];
}
