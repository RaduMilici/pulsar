export default class Clock {
  private startTime: number = 0;
  private oldTime: number = 0;
  private elapsedTime: number = 0;
  private running: boolean = false;

  getDeltaTime(): number {
    return 0;
  }

  getElapsedTime(): number {
    return 0;
  }
}