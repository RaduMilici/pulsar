const code = 
`const topLeft = new Pulsar.Vector({ x: -300, y: 300 });
const topRight = new Pulsar.Vector({ x: 300, y: 300 });
const bottomRight = new Pulsar.Vector({ x: 300, y: -300 });
const bottomLeft = new Pulsar.Vector({ x: -300, y: -300 });
const boxPoints: Pulsar.Vector[] = [topLeft, topRight, bottomRight, bottomLeft];
const box: Pulsar.BoundingBox = new Pulsar.BoundingBox(boxPoints);
const randomPoints: Pulsar.Vector[] = Pulsar.randomPoints(20, box);
const { hull }: Pulsar.Triangulation = new Pulsar.Triangulation(randomPoints);
hull.start();
draw.lines(hull.lines);
`;

export default { code, name: 'hull' };