import { pointLimits } from '../../../src/interfaces';
import { Vector, randomInt } from '../../../src';

const random = {
  color(): string {
    const r = randomInt(0, 255);
    const g = randomInt(0, 255); 
    const b = randomInt(0, 255);
    return `rgb(${r},${g},${b})`;
  },

  point({ top, bottom, left, right }: pointLimits): Vector {
    const x = randomInt(left, right);
    const y = randomInt(top, bottom);
  
    return new Vector({ x, y });
  },

  points(count: number, box: pointLimits): Vector[] {
    const points: Vector[] = [];
  
    for (let i = 0; i < count; i++) {
      points.push(this.point(box));
    }
  
    return points;
  }
}

export default random;
