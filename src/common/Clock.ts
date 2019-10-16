export default class Clock {
  private startTime: number = 0;
  private oldTime: number = 0;
  private elapsedTime: number = 0;
  private running: boolean = false;

  get elapsed(): number {
    return this.elapsedTime;
  }

  get delta(): number {
    const newTime: number = performance.now();
    const difference: number = (newTime - this.oldTime) / 1000;
    this.oldTime = newTime;
    this.elapsedTime += difference;
    return difference;
  }

  start(): boolean {
    if (this.running) {
      return false;
    }
    this.running = true;
    this.startTime = performance.now();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    return true;
  }

  stop(): boolean {
    if (!this.running) {
      return false;
    }
    this.running = false;
    return true;
  }
}
