import Entity from './Entity';
import { Clock } from '../common';
import { contains, removeFromArray } from '../util/id';
export default class Updater {
    constructor() {
        this.components = [];
        this.running = false;
        this.clock = new Clock();
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.clock.start();
            this.components.forEach(this.startComponent);
            this.update();
            return true;
        }
        return false;
    }
    stop() {
        if (this.running) {
            this.running = false;
            cancelAnimationFrame(this.frameId);
            this.clock.stop();
            this.components.forEach((component) => component.stop());
            return true;
        }
        return false;
    }
    clear() {
        this.stop();
        this.components.length = 0;
    }
    add(behaviour) {
        if (behaviour instanceof Entity) {
            return this.addEntity(behaviour);
        }
        else {
            return this.addComponent(behaviour);
        }
    }
    remove(behaviour) {
        if (behaviour instanceof Entity) {
            return this.removeEntity(behaviour);
        }
        else {
            this.removeComponent(behaviour);
        }
    }
    toggle(behaviour) {
        if (behaviour instanceof Entity) {
            return this.toggleEntity(behaviour);
        }
        else {
            this.toggleComponent(behaviour);
        }
    }
    addEntity(entity) {
        return entity.components.map((component) => {
            const added = this.addComponent(component);
            return { name: component.name, added };
        });
    }
    removeEntity(entity) {
        return entity.components.map((component) => {
            const removed = this.removeComponent(component);
            return { name: component.name, removed };
        });
    }
    toggleEntity(entity) {
        return entity.components.map((component) => {
            const toggled = this.toggleComponent(component);
            return { name: component.name, toggled };
        });
    }
    addComponent(component) {
        if (!contains(this.components, component)) {
            this.pushToQueue(component);
            return true;
        }
        return false;
    }
    removeComponent(component) {
        return removeFromArray(this.components, component);
    }
    toggleComponent(component) {
        if (!this.addComponent(component)) {
            this.removeComponent(component);
            return false;
        }
        return true;
    }
    pushToQueue(component) {
        if (typeof component.updatePriority === 'number') {
            this.components.splice(component.updatePriority, 0, component);
        }
        else {
            this.components.push(component);
        }
        this.startComponent(component);
    }
    startComponent(component) {
        component.updater = this;
        component.start();
    }
    update() {
        this.frameId = requestAnimationFrame(() => this.update());
        const deltaTime = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsed();
        this.components.forEach((component) => {
            const tickData = { deltaTime, elapsedTime };
            component.update(tickData);
        });
    }
}
//# sourceMappingURL=Updater.js.map