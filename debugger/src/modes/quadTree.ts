const code = `const topLeft = new Pulsar.Vector({ x: -300, y: 300 });
const topRight = new Pulsar.Vector({ x: 300, y: 300 });
const bottomRight = new Pulsar.Vector({ x: 300, y: -300 });
const bottomLeft = new Pulsar.Vector({ x: -300, y: -300 });
const boxPoints = [topLeft, topRight, bottomRight, bottomLeft];
const box = new Pulsar.BoundingBox(boxPoints);
const randomPoints = Pulsar.randomPoints(20, box);
const shape = new Pulsar.Shape(box.points);
const quadTree = new Pulsar.QuadTree(shape, randomPoints);

draw.points(randomPoints);
draw.quadTree(quadTree);
`;

export default { code, name: 'quad tree' };
