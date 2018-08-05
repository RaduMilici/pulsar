import id from './id';
import tickData from './tickData';

export default interface Update extends id {
  update(tickData: tickData): void;
}
