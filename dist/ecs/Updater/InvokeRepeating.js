import Invoke from './Invoke';
export default class InvokeRepeating extends Invoke {
    constructor(updater, component, interval, times) {
        super(updater, component, interval);
        this.times = times;
        this.updated = 0;
    }
    update(tickData) {
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
//# sourceMappingURL=InvokeRepeating.js.map