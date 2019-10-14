const code = 
`const limits = {
  top: 300,
  bottom: -300,
  left: -300,
  right: 300,
};
const points: Pulsar.Vector[] = util.random.points(20, limits);
const { triangles }: Pulsar.Triangulation = new Pulsar.Triangulation(points);

draw.triangles(triangles);
draw.points(points);
`;

export default { code, name: 'triangluation' };