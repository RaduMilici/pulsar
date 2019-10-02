const XOR = (a: boolean, b: boolean): boolean => {
  return (a || b) && !(a && b);
};

export default XOR;
