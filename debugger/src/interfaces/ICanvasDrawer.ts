import { Vector, Triangle } from '../../../src';

export default interface CanvasDrawer {
  point(
    position: Vector,
    strokeColor?: string,
    fillColor?: string,
    size?: number
  ): void;

  points(
    points: Vector[],
    strokeColor?: string,
    fillColor?: string,
    size?: number
  ): void;

  triangles(
    triangles: Triangle[],
    strokeColor?: string,
    fillColor?: string,
    size?: number
  ): void;

  clear(): void;
}

