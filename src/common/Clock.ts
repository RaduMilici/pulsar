export default class Clock {
  private startTime: number = 0;
  private oldTime: number = 0;
  private elapsedTime: number = 0;
  private readonly timeFunction: Performance | DateConstructor;

  constructor() {
    this.timeFunction = typeof performance === 'undefined' ? Date : performance;
  }

  start(): void {
    this.running = true;
    this.startTime = this.timeFunction.now();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
  }

  stop(): void {
    this.running = false;
  }

  getDelta(): number {
    const newTime: number = this.timeFunction.now();
    const difference: number = (newTime - this.oldTime) / 1000;
    this.oldTime = newTime;
    this.elapsedTime += difference;

    return difference;
  }

  getElapsed(): number {
    return this.elapsedTime;
  }
}
