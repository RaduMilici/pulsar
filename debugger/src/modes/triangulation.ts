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
const { triangles }: Pulsar.Triangulation = new Pulsar.Triangulation(randomPoints);
draw.triangles(triangles);
draw.points(randomPoints);
`;

export default { code, name: 'triangluation' };