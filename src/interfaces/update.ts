import id from './id';
import Time from '../util/Time';

export default interface update extends id {
  update(time: Time): void;
}
