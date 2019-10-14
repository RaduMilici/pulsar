const code = 
`const topLeft = new Pulsar.Vector({ x: -100, y: 100 });
const topRight = new Pulsar.Vector({ x: 100, y: 100 });
const bottomRight = new Pulsar.Vector({ x: 100, y: -100 });
const bottomLeft = new Pulsar.Vector({ x: -100, y: -100 });
const boxPoints: Pulsar.Vector[] = [
  topLeft, topRight, bottomRight, bottomLeft
];
const box: Pulsar.BoundingBox = new Pulsar.BoundingBox(boxPoints);
const randomPoints: Pulsar.Vector[] = Pulsar.randomPoints(20, box);
const { topLeft, topRight, bottomRight, bottomLeft } = box;
const quadShape = new Pulsar.Shape([topLeft, topRight, bottomRight, bottomLeft]);
const quadTree = new Pulsar.QuadTree(quadShape, points);

draw.points(randomPoints);
draw.quadTree(quadTree);
`;

export default { code, name: 'quad tree' };