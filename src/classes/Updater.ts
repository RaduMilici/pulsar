import Update from '../interfaces/update';
import Time from '../util/Time';
import { contains, findIndex } from '../util/id';

export default class Updater {
  private updates: Array<Update> = [];
  private animationFrameId: number = 0;
  private isSuspended: boolean = false;
  private isRunning: boolean = false;

  start(): boolean {
    if (!this.isRunning && !this.checkSuspend()) {
      this.isRunning = true;
      this.update();
      return true;
    }
    return false;
  }

  stop(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.isRunning = false;
    this.isSuspended = false;
  }

  add(update: Update): boolean {
    if (contains(this.updates, update)) {
      this.updates.push(update);
      this.checkProceed();
      return true;
    }
    return false;
  }

  remove(update: Update): boolean {
    const index = findIndex(this.updates, update);

    if (index !== -1) {
      this.updates.splice(index, 1);
      this.checkSuspend();
      return true;
    }

    return false;
  }

  removeAll(): void {
    this.updates.length = 0;
    this.checkSuspend();
  }

  private suspend(): void {
    this.stop();
    this.isSuspended = true;
  }

  private checkSuspend(): boolean {
    if (this.updates.length === 0) {
      this.suspend();
      return true;
    }

    return false;
  }

  private checkProceed(): void {
    if (this.isSuspended) {
      this.start();
      this.isSuspended = false;
    }
  }

  private update(): void {
    this.animationFrameId = requestAnimationFrame(this.update.bind(this));
    const time = new Time();
    this.updates.forEach(update => update.update(time));
  }
}
