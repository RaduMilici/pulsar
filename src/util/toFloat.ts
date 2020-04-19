const floatPrecision: number = 2;

const toFloat = (number: number): number => {
  return Number(number.toFixed(floatPrecision));
};

export default toFloat;
