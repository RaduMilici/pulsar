import { Clock } from '../../common';
import { contains, removeFromArray } from '../../util';
import Component from '../Component';
import EntityUpdater from './EntityUpdater';
import Invoke from './Invoke';
import InvokeRepeating from './InvokeRepeating';
export default class Updater {
    constructor() {
        this.onUpdateComplete = new Component();
        this.components = [];
        this.running = false;
        this.clock = new Clock();
        this.entityUpdater = new EntityUpdater(this);
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.clock.start();
            this.entityUpdater.start();
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
            this.entityUpdater.stop();
            this.components.forEach((component) => component.stop());
            return true;
        }
        return false;
    }
    clear() {
        this.stop();
        this.entityUpdater.clear();
        this.components.length = 0;
    }
    add(behaviour) {
        if (behaviour instanceof Component) {
            return this.addComponent(behaviour);
        }
        else {
            return this.entityUpdater.add(behaviour);
        }
    }
    remove(behaviour) {
        if (behaviour instanceof Component) {
            return this.removeComponent(behaviour);
        }
        else {
            return this.entityUpdater.remove(behaviour);
        }
    }
    toggle(behaviour) {
        if (behaviour instanceof Component) {
            return this.toggleComponent(behaviour);
        }
        else {
            return this.entityUpdater.toggle(behaviour);
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
    invoke(component, time) {
        const invoke = new Invoke(this, component, time);
        this.add(invoke);
    }
    invokeRepeating(component, time, times = Infinity) {
        const invoke = new InvokeRepeating(this, component, time, times);
        this.add(invoke);
    }
    getTickData() {
        const deltaTime = this.clock.getDelta();
        const deltaTimeMS = deltaTime * 1000;
        const elapsedTime = this.clock.getElapsed();
        return { deltaTime, deltaTimeMS, elapsedTime };
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
        const tickData = this.getTickData();
        this.components.forEach((component) => {
            component.update(tickData);
        });
        this.onUpdateComplete.update(tickData);
    }
}
//# sourceMappingURL=Updater.js.map