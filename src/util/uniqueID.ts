const chr4 = (): string =>
  Math.random()
    .toString(16)
    .slice(-4);

const uniqueId = (): string => `${chr4()}-${chr4()}-${chr4()}-${chr4()}`;

export default uniqueId;
