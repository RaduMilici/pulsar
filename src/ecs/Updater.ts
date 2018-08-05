import Component from './Component';
import { tickData } from '../interfaces';
import { Clock } from '../common';
import { contains, removeFromArray } from '../util/id';

export default class Updater {
  private components: Component[] = [];
  private running: boolean = false;
  private clock: Clock = new Clock();
  private frameId: number;

  start(): boolean {
    if (!this.running) {
      this.running = true;

      this.components.forEach((component: Component) => {
        component.updater = this;
        component.start();
      });

      this.update();
      return true;
    }

    return false;
  }

  stop(): boolean {
    if (this.running) {
      this.running = false;
      cancelAnimationFrame(this.frameId);
      this.components.forEach((component: Component) => component.stop());
      return true;
    }

    return false;
  }

  clear(): void {
    this.stop();
    this.components.length = 0;
  }

  add(component: Component): boolean {
    if (!contains(this.components, component)) {
      this.components.push(component);
      return true;
    }
    return false;
  }

  remove(component: Component): boolean {
    return removeFromArray(this.components, component);
  }

  update(): void {
    this.frameId = requestAnimationFrame(() => this.update());

    const deltaTime: number = this.clock.getDeltaTime();
    const elapsedTime: number = this.clock.getElapsedTime();

    this.components.forEach((component: Component) => {
      const tickData: tickData = { deltaTime, elapsedTime };
      component.update(tickData);
    });
  }
}
