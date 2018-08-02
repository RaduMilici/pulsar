const isNumeric = (n: number): boolean => {
  return !isNaN(parseFloat(n.toString())) && isFinite(n);
};

export default isNumeric;
