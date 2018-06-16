export default class Time {
  readonly currentTime: number = 0;
  readonly delta: number = 0;
  readonly elapsed: number = 0;
  private static lastTime: number | null = null;

  constructor() {
    const timestamp = Time.now();

    if (Time.lastTime === null) {
      Time.lastTime = timestamp;
    }

    this.currentTime = timestamp;
    this.elapsed = this.currentTime - Time.lastTime;
    this.delta = this.elapsed / 1000;
    Time.lastTime = timestamp;
  }

  static now(): number {
    return performance.now();
  }
}
