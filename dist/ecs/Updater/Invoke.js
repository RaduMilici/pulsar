import Component from '../Component';
import { uniqueId } from '../../util';
export default class Invoke extends Component {
    constructor(updater, component, timeout) {
        super();
        this.updater = updater;
        this.component = component;
        this.timeout = timeout;
        this.id = uniqueId();
        this.originalTimeout = timeout;
    }
    update(tickData) {
        this.timeout -= tickData.deltaTimeMS;
        if (this.timeout <= 0) {
            this.component.update(tickData);
            this.stop();
        }
    }
    stop() {
        return this.updater.remove(this);
    }
}
//# sourceMappingURL=Invoke.js.map