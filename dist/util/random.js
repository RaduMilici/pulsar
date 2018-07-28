const int = (min, max) => {
    return Math.round(float(min, max));
};
const float = (min, max) => {
    return Math.random() * (max - min) + min;
};
const color = () => {
    const r = int(0, 255);
    const g = int(0, 255);
    const b = int(0, 255);
    return `rgb(${r},${g},${b})`;
};
export { int, float, color };
//# sourceMappingURL=random.js.map