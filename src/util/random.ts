import Vector from '../common/Vector';
import BoundingBox from '../common/BoundingBox';

const randomInt = (min: number, max: number): number => {
  return Math.round(randomFloat(min, max));
};

const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const randomColor = () => {
  const r = randomInt(0, 255);
  const g = randomInt(0, 255);
  const b = randomInt(0, 255);
  return `rgb(${r},${g},${b})`;
};

const randomPoint = ({
  topLeft,
  topRight,
  bottomLeft,
}: BoundingBox): Vector => {
  const x = randomInt(topLeft.x, topRight.x);
  const y = randomInt(bottomLeft.y, topLeft.y);

  return new Vector({ x, y });
};

const randomPoints = (count: number, box: BoundingBox): Vector[] => {
  const points: Vector[] = [];

  for (let i = 0; i < count; i++) {
    points.push(randomPoint(box));
  }

  return points;
};

export { randomInt, randomFloat, randomColor, randomPoint, randomPoints };
