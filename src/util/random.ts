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

export { randomInt, randomFloat, randomColor };
