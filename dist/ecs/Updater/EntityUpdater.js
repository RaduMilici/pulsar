export default class EntityUpdater {
    constructor(updater) {
        this.updater = updater;
        this.entities = [];
    }
    start() {
        this.entities.forEach((entity) => entity.start());
    }
    stop() {
        this.entities.forEach((entity) => entity.stop());
    }
    clear() {
        this.entities.length = 0;
    }
    add(entity) {
        entity.updater = this.updater;
        this.entities.push(entity);
        const callback = (component) => {
            component.entity = entity;
            return this.updater.addComponent(component);
        };
        return this.loopComponents(entity.components, callback);
    }
    remove({ components }) {
        const callback = component => this.updater.removeComponent(component);
        return this.loopComponents(components, callback);
    }
    toggle({ components }) {
        const callback = component => this.updater.toggleComponent(component);
        return this.loopComponents(components, callback);
    }
    loopComponents(components, callback) {
        return components.map((component) => {
            return {
                id: component.id,
                name: component.name,
                success: callback(component),
            };
        });
    }
}
//# sourceMappingURL=EntityUpdater.js.map