const code = `const topLeft = new Pulsar.Vector({ x: -300, y: 300 });
const topRight = new Pulsar.Vector({ x: 300, y: 300 });
const bottomRight = new Pulsar.Vector({ x: 300, y: -300 });
const bottomLeft = new Pulsar.Vector({ x: -300, y: -300 });
const boxPoints = [topLeft, topRight, bottomRight, bottomLeft];
const box = new Pulsar.BoundingBox(boxPoints);
const randomPoints = Pulsar.randomPoints(50, box);
const triangulation = new Pulsar.Triangulation(randomPoints);
const hull = new Pulsar.Hull(triangulation);

draw.lines(hull.lines);
draw.points(randomPoints);
`;

export default { code, name: 'hull' };
