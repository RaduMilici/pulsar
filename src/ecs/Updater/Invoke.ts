import Component from '../Component';
import Updater from './Updater';
import { id, Update, tickData } from '../../interfaces';
import { uniqueId } from '../../util';

export default class Invoke implements id, Update {
    id: number = uniqueId();

    constructor(readonly updater: Updater, readonly component: Component, readonly timeout: number) {
        setTimeout(() => this.update(), timeout);
    }

    update() {
        const tickData: tickData = this.updater.getTickData();
        this.component.update(tickData);
    }

}