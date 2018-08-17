import { uniqueId } from '../util';
export default class Component {
    constructor() {
        this.updatePriority = null;
        this.id = uniqueId();
    }
    start() { }
    stop() { }
    update(tickData) { }
}
//# sourceMappingURL=Component.js.map