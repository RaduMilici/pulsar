import Component from '../Component';
import { tickData, I_Updater } from '../../interfaces';
import { uniqueId } from '../../util';

export default class Invoke extends Component {
  id: string = uniqueId();
  originalTimeout: number;

  constructor(
    readonly updater: I_Updater,
    readonly component: Component,
    public timeout: number
  ) {
    super();
    this.originalTimeout = timeout;
  }

  update(tickData: tickData): void {
    this.timeout -= tickData.deltaTimeMS;

    if (this.timeout <= 0) {
      this.component.update(tickData);
      this.stop();
    }
  }

  stop(): boolean {
    return this.updater.remove(this);
  }
}
