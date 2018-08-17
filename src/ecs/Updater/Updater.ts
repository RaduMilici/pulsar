import Component from '../Component';
import Entity from '../Entity';
import EntityUpdater from './EntityUpdater';
import { tickData } from '../../interfaces/index';
import { Clock } from '../../common';
import { contains, removeFromArray } from '../../util/id';
import { updaterReport } from '../../interfaces';

export default class Updater {
  private components: Component[] = [];
  private running: boolean = false;
  private clock: Clock = new Clock();
  private entityUpdater: EntityUpdater = new EntityUpdater(this);
  private frameId: number;

  start(): boolean {
    if (!this.running) {
      this.running = true;
      this.clock.start();
      this.components.forEach((component: Component) => component.start());
      this.update();
      return true;
    }
    return false;
  }

  stop(): boolean {
    if (this.running) {
      this.running = false;
      cancelAnimationFrame(this.frameId);
      this.clock.stop();
      this.components.forEach((component: Component) => component.stop());
      return true;
    }
    return false;
  }

  clear(): void {
    this.stop();
    this.components.length = 0;
  }

  add(entity: Entity): updaterReport[];
  add(component: Component): boolean;
  add(behaviour: Entity | Component): boolean | updaterReport[] {
    if (behaviour instanceof Entity) {
      return this.entityUpdater.add(behaviour);
    } else {
      return this.addComponent(behaviour);
    }
  }

  remove(entity: Entity): updaterReport[];
  remove(component: Component): boolean;
  remove(behaviour: Entity | Component): boolean | updaterReport[] {
    if (behaviour instanceof Entity) {
      return this.entityUpdater.remove(behaviour);
    } else {
      return this.removeComponent(behaviour);
    }
  }

  toggle(entity: Entity): updaterReport[];
  toggle(component: Component): boolean;
  toggle(behaviour: Entity | Component): boolean | updaterReport[] {
    if (behaviour instanceof Entity) {
      return this.entityUpdater.toggle(behaviour);
    } else {
      return this.toggleComponent(behaviour);
    }
  }

  isUpdatingComponent(component: Component): boolean {
    return contains(this.components, component);
  }

  addComponent(component: Component): boolean {
    if (!this.isUpdatingComponent(component)) {
      component.updater = this;
      this.pushToQueue(component);
      return true;
    }
    return false;
  }

  removeComponent(component: Component): boolean {
    return removeFromArray(this.components, component);
  }

  toggleComponent(component: Component): boolean {
    if (!this.addComponent(component)) {
      this.removeComponent(component);
      return false;
    }
    return true;
  }

  private pushToQueue(component: Component): void {
    if (typeof component.updatePriority === 'number') {
      this.components.splice(component.updatePriority, 0, component);
    } else {
      this.components.push(component);
    }
  }

  private update(): void {
    this.frameId = requestAnimationFrame(() => this.update());

    const deltaTime: number = this.clock.getDelta();
    const elapsedTime: number = this.clock.getElapsed();

    this.components.forEach((component: Component) => {
      const tickData: tickData = { deltaTime, elapsedTime };
      component.update(tickData);
    });
  }
}
