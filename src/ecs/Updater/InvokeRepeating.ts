import { id, Update, tickData } from '../../interfaces';
import { uniqueId } from '../../util';
import Component from '../Component';
import Updater from './Updater';
import Invoke from './Invoke';

export default class InvokeRepeating extends Invoke {

    constructor(updater: Updater, component: Component, interval: number) {
        super(updater, component, interval);
    }

    update() {
        const tickData: tickData = this.updater.getTickData();
        this.component.update(tickData);

        setTimeout(() => {

            const tickData: tickData = this.updater.getTickData();
            this.component.update(tickData);
        } ,this.timeout)
    }

}