import Update from '../interfaces/update';
import Time from '../util/Time';
import uniqueID from '../util/uniqueID';

export default class Behaviour implements Update {
  id: number;

  constructor() {
    this.id = uniqueID();
  }

  update(time: Time): void {
    console.log(time);
  }
}
