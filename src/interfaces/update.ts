import id from './id';
import tickData from '../types/ECS/tickData';

export default interface Update extends id {
  update(tickData: tickData): void;
}
