const code = 
`const { random } = util;
const box = {
  top: 300,
  bottom: -300,
  left: -300,
  right: 300,
};
const points = random.points(100, box);
const triangulation = new pulsar.Triangulation(points);
draw.triangles(triangulation.triangles);
draw.points(points);
`;

export default { code };