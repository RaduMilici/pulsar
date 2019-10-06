import { Clock } from '../../common';
import { contains, removeFromArray, uniqueId } from '../../util';
import { tickData, I_Updater } from '../../interfaces';
import { updaterReport } from '../../types';
import Component from '../Component';
import GameObject from '../GameObject';
//import EntityUpdater from './EntityUpdater';
import Invoke from './Invoke';
import InvokeRepeating from './InvokeRepeating';

export default class Updater implements I_Updater {
  name: string = 'Updater';
  id: string = uniqueId();
  onUpdateComplete: Component = new Component();

  private components: Component[] = [];
  private running: boolean = false;
  private clock: Clock = new Clock();
  private frameId: number;

  start(): boolean {
    if (this.running) {
      return false;
    }
    this.running = true;
    this.clock.start();
    this.components.forEach((component: Component) => component.start());
    this.update();
    return true;
  }

  stop(): boolean {
    if (!this.running) {
      return false;
    }
    this.running = false;
    cancelAnimationFrame(this.frameId);
    this.clock.stop();
    this.components.forEach((component: Component) => component.stop());
    return true;
  }

  clear(): void {
    this.stop();
    this.components.length = 0;
  }

  add(gameObject: GameObject): updaterReport[];
  add(component: Component): boolean;
  add(behaviour: GameObject | Component): boolean | updaterReport[] {
    if (behaviour instanceof Component) {
      return this.addComponent(behaviour);
    } else {
      //return this.entityUpdater.add(behaviour);
    }
  }

  remove(entity: GameObject): updaterReport[];
  remove(component: Component): boolean;
  remove(behaviour: GameObject | Component): boolean | updaterReport[] {
    if (behaviour instanceof Component) {
      return this.removeComponent(behaviour);
    } else {
      //return this.entityUpdater.remove(behaviour);
    }
  }

  toggle(entity: GameObject): updaterReport[];
  toggle(component: Component): boolean;
  toggle(behaviour: GameObject | Component): boolean | updaterReport[] {
    if (behaviour instanceof Component) {
      return this.toggleComponent(behaviour);
    } else {
      //return this.entityUpdater.toggle(behaviour);
    }
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

  private addComponent(component: Component): boolean {
    if (!this.isUpdatingComponent(component)) {
      this.pushToQueue(component);
      return true;
    }
    return false;
  }

  private isUpdatingComponent(component: Component): boolean {
    return contains(this.components, component);
  }

  private getTickData(): tickData {
    const deltaTime: number = this.clock.getDelta();
    const deltaTimeMS: number = deltaTime * 1000;
    const elapsedTime: number = this.clock.getElapsed();
    return { deltaTime, deltaTimeMS, elapsedTime };
  }

  private pushToQueue(component: Component): void {
    if (Number.isFinite(component.updatePriority)) {
      this.components.splice(component.updatePriority, 0, component);
    } else {
      this.components.push(component);
    }
  }

  private update = (): void => {
    this.frameId = requestAnimationFrame(this.update);

    const tickData: tickData = this.getTickData();

    this.components.forEach((component: Component) => {
      component.update(tickData);
    });

    this.onUpdateComplete.update(tickData);
  }
}
