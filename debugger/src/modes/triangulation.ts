const code = 
`const box: boundingBox = {
  top: 300,
  bottom: -300,
  left: -300,
  right: 300,
};
const points: Vector[] = util.random.points(20, box);
const triangulation: Triangulation = new Triangulation(points);

draw.triangles(triangulation.triangles);
draw.points(points);
`;

export default { code };