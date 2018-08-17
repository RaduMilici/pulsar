export default class EntityUpdater {
    constructor(updater) {
        this.updater = updater;
    }
    add(entity) {
        entity.updater = this.updater;
        const callback = component => this.updater.addComponent(component);
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