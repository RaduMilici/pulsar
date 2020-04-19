import { uniqueId } from '../util';
export default class Entity {
    constructor() {
        this.id = uniqueId();
        this.components = [];
    }
    start() { }
    stop() { }
}
//# sourceMappingURL=Entity.js.map