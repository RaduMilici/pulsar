import Component from '../Component';
import Updater from './Updater';
import { tickData } from '../../interfaces';
export default class Invoke extends Component {
    readonly updater: Updater;
    readonly component: Component;
    timeout: number;
    id: number;
    originalTimeout: number;
    constructor(updater: Updater, component: Component, timeout: number);
    update(tickData: tickData): void;
    stop(): boolean;
}
//# sourceMappingURL=Invoke.d.ts.map