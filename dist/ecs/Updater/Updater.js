import Entity from '../Entity';
import EntityUpdater from './EntityUpdater';
import { Clock } from '../../common';
import { contains, removeFromArray } from '../../util/id';
export default class Updater {
    constructor() {
        this.components = [];
        this.running = false;
        this.clock = new Clock();
        this.entityUpdater = new EntityUpdater(this);
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.clock.start();
            this.components.forEach((component) => component.start());
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
            return this.entityUpdater.add(behaviour);
        }
        else {
            return this.addComponent(behaviour);
        }
    }
    remove(behaviour) {
        if (behaviour instanceof Entity) {
            return this.entityUpdater.remove(behaviour);
        }
        else {
            return this.removeComponent(behaviour);
        }
    }
    toggle(behaviour) {
        if (behaviour instanceof Entity) {
            return this.entityUpdater.toggle(behaviour);
        }
        else {
            return this.toggleComponent(behaviour);
        }
    }
    isUpdatingComponent(component) {
        return contains(this.components, component);
    }
    addComponent(component) {
        if (!this.isUpdatingComponent(component)) {
            component.updater = this;
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