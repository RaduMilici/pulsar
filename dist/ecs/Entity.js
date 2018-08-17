import { uniqueId } from '../util';
export default class Entity {
    constructor() {
        this.id = uniqueId();
        this.components = [];
    }
}
//# sourceMappingURL=Entity.js.map