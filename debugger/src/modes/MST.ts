const code = `const topLeft = new Pulsar.Vector({ x: -300, y: 300 });
const topRight = new Pulsar.Vector({ x: 300, y: 300 });
const bottomRight = new Pulsar.Vector({ x: 300, y: -300 });
const bottomLeft = new Pulsar.Vector({ x: -300, y: -300 });
const boxPoints = [topLeft, topRight, bottomRight, bottomLeft];
const box = new Pulsar.BoundingBox(boxPoints);
const randomPoints = Pulsar.randomPoints(20, box);
const triangulation = new Pulsar.Triangulation(randomPoints);
const MST = new Pulsar.MinimumSpanningTree(triangulation);

draw.lines(MST.lines);
draw.points(randomPoints);
`;

export default { code, name: 'MST' };
