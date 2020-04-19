const isOdd = (n) => Math.abs(n % 2) === 1;
const isEven = (n) => n % 2 === 0;
const isNumeric = (n) => {
    return !isNaN(parseFloat(n.toString())) && isFinite(n);
};
export { isOdd, isEven, isNumeric };
//# sourceMappingURL=number.js.map