import { tickData } from '../../interfaces';
import Component from '../Component';
import Updater from './Updater';
import Invoke from './Invoke';
export default class InvokeRepeating extends Invoke {
    private times;
    private updated;
    constructor(updater: Updater, component: Component, interval: number, times: number);
    update(tickData: tickData): void;
}
//# sourceMappingURL=InvokeRepeating.d.ts.map