export default class Clock {
  private startTime: number = 0;
  private oldTime: number = 0;
  private elapsedTime: number = 0;
  private running: boolean = false;
  private readonly timeFunction: Performance | DateConstructor;

  constructor() {
    this.timeFunction = typeof performance === 'undefined' ? Date : performance;
  }

  get elapsed(): number {
    return this.elapsedTime;
  }

  start(): boolean {
    if (this.running) {
      return false;
    }
    this.running = true;
    this.startTime = this.timeFunction.now();
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

  getDelta(): number {
    const newTime: number = this.timeFunction.now();
    const difference: number = (newTime - this.oldTime) / 1000;
    this.oldTime = newTime;
    this.elapsedTime += difference;
    return difference;
  }
}
