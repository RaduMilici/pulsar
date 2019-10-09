import { point, size } from '../../../src';

export default abstract class {
  protected origin: point;
  protected size: size;

  constructor(protected context: CanvasRenderingContext2D) {
    this.setSizes();
  }
  
  protected toCarthesian(point: point): point {
    return {
      x: point.x + this.origin.x,
      y: point.y + this.origin.y,
    };
  }

  private setSizes() {
    const { width, height }: size = this.context.canvas;
    this.size = { width, height };
    this.origin = {
      x: this.size.width / 2,
      y: this.size.height / 2,
    };
  }
}