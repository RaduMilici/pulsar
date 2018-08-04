const isOdd = (n: number) => Math.abs(n % 2) === 1;

const isEven = (n: number): boolean => n % 2 === 0;

const isNumeric = (n: number): boolean => {
  return !isNaN(parseFloat(n.toString())) && isFinite(n);
};

export { isOdd, isEven, isNumeric };
