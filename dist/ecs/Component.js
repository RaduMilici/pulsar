import { uniqueId } from '../util';
export default class Component {
    constructor() {
        this.id = uniqueId();
        this.updatePriority = null;
    }
    start() { }
    stop() { }
    update(tickData) { }
}
//# sourceMappingURL=Component.js.map