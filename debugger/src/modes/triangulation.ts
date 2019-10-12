const code = 
`const limits = {
  top: 250,
  bottom: -250,
  left: -250,
  right: 250,
};
const points: Vector[] = util.random.points(20, limits);
const triangulation: Triangulation = new Triangulation(points);

draw.triangles(triangulation.triangles);
draw.points(points);
`;

export default { code };