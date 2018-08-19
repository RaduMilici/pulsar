import { Vector } from '../common';
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
const randomPoint = ({ topLeft, topRight, bottomLeft, }) => {
    const x = randomInt(topLeft.x, topRight.x);
    const y = randomInt(bottomLeft.y, topLeft.y);
    return new Vector({ x, y });
};
const randomPoints = (count, box) => {
    const points = [];
    for (let i = 0; i < count; i++) {
        points.push(randomPoint(box));
    }
    return points;
};
export { randomInt, randomFloat, randomColor, randomPoint, randomPoints };
//# sourceMappingURL=random.js.map