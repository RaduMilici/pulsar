const code = `const topLeft = new Pulsar.Vector({ x: -300, y: 300 });
const topRight = new Pulsar.Vector({ x: 300, y: 300 });
const bottomRight = new Pulsar.Vector({ x: 300, y: -300 });
const bottomLeft = new Pulsar.Vector({ x: -300, y: -300 });
const boxPoints: Pulsar.Vector[] = [topLeft, topRight, bottomRight, bottomLeft];
const box: Pulsar.BoundingBox = new Pulsar.BoundingBox(boxPoints);
const randomPoints: Pulsar.Vector[] = Pulsar.randomPoints(3, box);
const { hull }: Pulsar.Triangulation = new Pulsar.Triangulation(randomPoints);
hull.start();
draw.lines(hull.lines);
draw.points(hull.points);
draw.point(Pulsar.Vector.FindPolyCentroid(randomPoints), 'red', 'red', 10);
`;

export default { code, name: 'centroid' };