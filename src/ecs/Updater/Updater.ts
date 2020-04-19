import { Clock } from '../../common';
import { contains, removeFromArray } from '../../util';
import { updaterReport, tickData } from '../../interfaces';
import Component from '../Component';
import Entity from '../Entity';
import EntityUpdater from './EntityUpdater';
import Invoke from './Invoke';
import InvokeRepeating from './InvokeRepeating';

export default class Updater {
  onUpdateComplete: Component = new Component();

  private components: Component[] = [];
  private running: boolean = false;
  private clock: Clock = new Clock();
  private entityUpdater: EntityUpdater = new EntityUpdater(this);
  private frameId: number;

  start(): boolean {
    if (!this.running) {
      this.running = true;
      this.clock.start();
      this.entityUpdater.start();
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
      this.entityUpdater.stop();
      this.components.forEach((component: Component) => component.stop());
      return true;
    }
    return false;
  }

  clear(): void {
    this.stop();
    this.entityUpdater.clear();
    this.components.length = 0;
  }

  add(entity: Entity): updaterReport[];
  add(component: Component): boolean;
  add(behaviour: Entity | Component): boolean | updaterReport[] {
    if (behaviour instanceof Component) {
      return this.addComponent(behaviour);
    } else {
      return this.entityUpdater.add(behaviour);
    }
  }

  remove(entity: Entity): updaterReport[];
  remove(component: Component): boolean;
  remove(behaviour: Entity | Component): boolean | updaterReport[] {
    if (behaviour instanceof Component) {
      return this.removeComponent(behaviour);
    } else {
      return this.entityUpdater.remove(behaviour);
    }
  }

  toggle(entity: Entity): updaterReport[];
  toggle(component: Component): boolean;
  toggle(behaviour: Entity | Component): boolean | updaterReport[] {
    if (behaviour instanceof Component) {
      return this.toggleComponent(behaviour);
    } else {
      return this.entityUpdater.toggle(behaviour);
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

  invoke(component: Component, time: number): void {
    const invoke: Invoke = new Invoke(this, component, time);
    this.add(invoke);
  }

  invokeRepeating(
    component: Component,
    time: number,
    times: number = Infinity
  ): void {
    const invoke: InvokeRepeating = new InvokeRepeating(
      this,
      component,
      time,
      times
    );
    this.add(invoke);
  }

  getTickData(): tickData {
    const deltaTime: number = this.clock.getDelta();
    const deltaTimeMS: number = deltaTime * 1000;
    const elapsedTime: number = this.clock.getElapsed();
    return { deltaTime, deltaTimeMS, elapsedTime };
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

    const tickData: tickData = this.getTickData();

    this.components.forEach((component: Component) => {
      component.update(tickData);
    });

    this.onUpdateComplete.update(tickData);
  }
}
