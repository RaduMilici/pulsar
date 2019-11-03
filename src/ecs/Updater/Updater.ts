import { Clock } from '../../common';
import { contains, removeFromArray } from '../../util';
import { tickData, I_Component, I_GameObject } from '../../interfaces';

export default class Updater {
  private clock: Clock = new Clock();
  private gameObjects: I_GameObject[] = [];
  private isRunning: boolean = false;
  private frameId: number;

  private get tickData(): tickData {
    const deltaTime: number = this.clock.delta;
    const deltaTimeMS: number = deltaTime * 1000;
    const elapsedTime: number = this.clock.elapsed;
    return { deltaTime, deltaTimeMS, elapsedTime };
  }

  start(): boolean {
    if (this.isRunning) {
      return false;
    }
    this.isRunning = true;
    this.clock.start();
    this.loopComponentsWithCallback((component: I_Component) =>
      component.start()
    );
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
    this.loopComponentsWithCallback((component: I_Component) =>
      component.stop()
    );
    return true;
  }

  clear(): void {
    this.gameObjects.length = 0;
  }

  add(gameObject: I_GameObject): boolean {
    const isUpdating: boolean = contains(this.gameObjects, gameObject);
    if (!isUpdating) {
      this.gameObjects.push(gameObject);
    }
    return isUpdating;
  }

  remove(gameObject: I_GameObject): boolean {
    return removeFromArray(this.gameObjects, gameObject);
  }

  private loopComponentsWithCallback(
    callback: (component: I_Component) => void
  ): void {
    this.gameObjects.forEach(({ components }: I_GameObject) => {
      components.forEach(callback);
    });
  }

  private update = (): void => {
    this.frameId = requestAnimationFrame(this.update);
    this.loopComponentsWithCallback((component: I_Component) =>
      component.update(this.tickData)
    );
  };
}
