import { uniqueId } from '../util';
export default class Entity {
    constructor() {
        this.components = [];
        this.id = uniqueId();
    }
}
//# sourceMappingURL=Entity.js.map