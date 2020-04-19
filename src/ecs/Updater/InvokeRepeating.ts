import { id, Update, tickData } from '../../interfaces';
import { uniqueId } from '../../util';
import Component from '../Component';
import Updater from './Updater';
import Invoke from './Invoke';

export default class InvokeRepeating extends Invoke {
  private updated: number = 0;

  constructor(
    updater: Updater,
    component: Component,
    interval: number,
    private times: number
  ) {
    super(updater, component, interval);
  }

  update(tickData: tickData) {
    this.timeout -= tickData.deltaTimeMS;

    if (this.timeout <= 0) {
      if (++this.updated === this.times) {
        this.stop();
      }
      this.component.update(tickData);
      this.timeout = this.originalTimeout;
    }
  }
}
