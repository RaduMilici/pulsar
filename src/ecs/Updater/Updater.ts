import { Clock } from '../../common';
import { contains, removeFromArray } from '../../util';
import {
  updaterReport,
  tickData,
  I_Component,
  I_GameObject,
} from '../../interfaces';

export default class Updater {
  private clock: Clock = new Clock();
  private components: I_Component[] = [];
  private isRunning: boolean = false;
  private frameId: number;

  start(): boolean {
    if (this.isRunning) {
      return false;
    }
    this.isRunning = true;
    this.clock.start();
    this.components.forEach((component: I_Component) => component.start());
    this.update();
    return true;
  }

  stop(): boolean {
    if (!this.isRunning) {
      return false;
    }
    this.isRunning = false;
    cancelAnimationFrame(this.frameId);
    this.clock.stop();
    this.components.forEach((component: I_Component) => component.stop());
    return true;
  }

  clear(): void {
    this.stop();
    this.components.length = 0;
  }

  add({ components }: I_GameObject): updaterReport[] {
    return this.loopComponentsWithCallback(components, this.addComponent);
  }

  remove({ components }: I_GameObject): updaterReport[] {
    return this.loopComponentsWithCallback(components, this.removeComponent);
  }

  toggle({ components }: I_GameObject): updaterReport[] {
    return this.loopComponentsWithCallback(components, this.toggleComponent);
  }

  addComponent(component: I_Component): boolean {
    if (!this.isUpdatingComponent(component)) {
      this.pushToQueue(component);
      return true;
    }
    return false;
  }

  removeComponent(component: I_Component): boolean {
    return removeFromArray(this.components, component);
  }

  toggleComponent(component: I_Component): boolean {
    if (!this.addComponent(component)) {
      this.removeComponent(component);
      return false;
    }
    return true;
  }

  getTickData(): tickData {
    const deltaTime: number = this.clock.delta;
    const deltaTimeMS: number = deltaTime * 1000;
    const elapsedTime: number = this.clock.elapsed;
    return { deltaTime, deltaTimeMS, elapsedTime };
  }

  private isUpdatingComponent(component: I_Component): boolean {
    return contains(this.components, component);
  }

  private loopComponentsWithCallback(
    components: I_Component[],
    callback: (component: I_Component) => boolean
  ): updaterReport[] {
    return components.map(
      (component: I_Component): updaterReport => {
        return {
          name: component.name,
          success: callback(component),
        };
      }
    );
  }

  private pushToQueue(component: I_Component): void {
    if (Number.isFinite(component.updatePriority)) {
      this.components.splice(component.updatePriority, 0, component);
    } else {
      this.components.push(component);
    }
  }

  private update = (): void => {
    const tickData: tickData = this.getTickData();
    this.frameId = requestAnimationFrame(this.update);

    this.components.forEach((component: I_Component) => {
      component.update(tickData);
    });
  };
}
