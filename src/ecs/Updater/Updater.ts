import { Clock } from '../../common';
import { contains, removeFromArray } from '../../util/id';
import { tickData } from '../../interfaces';
import { I_Component } from '../Component';
import { I_GameObject } from '../GameObject';
import I_Updater from './I_Updater';

export default class Updater implements I_Updater {
  readonly id: string = 'Updater';
  readonly name: string = 'Updater';

  private clock: Clock = new Clock();
  private gameObjects: I_GameObject[] = [];
  private isRunning: boolean = false;
  private frameId: number;

  constructor() {
    this.update = this.update.bind(this);
  }

  private getTickData(): tickData {
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
    this.loopComponentsWithCallback(({ start }: I_Component) => start());
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
    this.loopComponentsWithCallback(({ stop }: I_Component) => stop());
    return true;
  }

  clear(): void {
    this.stop();
    this.gameObjects.length = 0;
  }

  add(gameObject: I_GameObject): boolean {
    const canAdd: boolean = !contains(this.gameObjects, gameObject);
    if (canAdd) {
      this.gameObjects.push(gameObject);
    }
    return canAdd;
  }

  remove(gameObject: I_GameObject): boolean {
    return removeFromArray(this.gameObjects, gameObject);
  }

  private loopComponentsWithCallback(callback: (component: I_Component) => void): void {
    this.gameObjects.forEach(({ components }: I_GameObject) => components.forEach(callback));
  }

  protected update(): void {
    this.frameId = requestAnimationFrame(this.update);
    const tickData: tickData = this.getTickData();
    this.loopComponentsWithCallback((component: I_Component) => component.update(tickData));
  }
}
