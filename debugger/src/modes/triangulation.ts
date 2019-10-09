const code = 
`const { Triangulation, Vector, Line } = pulsar;
const { random } = util;
const box = {
  top: 300,
  bottom: -300,
  left: -300,
  right: 300,
};
const points = random.points(10, box);
const triangulation = new Triangulation(points);
triangulation.MST.start();
triangulation.hull.start();
canvas.draw.points(points);
`;

export default { code };