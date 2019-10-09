const code = 
`const { Triangulation } = pulsar;
const { random } = util;
const box = {
  top: 300,
  bottom: -300,
  left: -300,
  right: 300,
};
const points = random.points(100, box);
const { triangles } = new Triangulation(points);
draw.triangles(triangles);
draw.points(points);
`;

export default { code };