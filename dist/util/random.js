const randomInt = (min, max) => {
    return Math.round(randomFloat(min, max));
};
const randomFloat = (min, max) => {
    return Math.random() * (max - min) + min;
};
const randomColor = () => {
    const r = randomInt(0, 255);
    const g = randomInt(0, 255);
    const b = randomInt(0, 255);
    return `rgb(${r},${g},${b})`;
};
export { randomInt, randomFloat, randomColor };
//# sourceMappingURL=random.js.map