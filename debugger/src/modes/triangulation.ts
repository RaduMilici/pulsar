const code = 
`const limits = {
  top: 200,
  bottom: -200,
  left: -200,
  right: 200,
};
const points: Vector[] = util.random.points(20, limits);
const { triangles }: Triangulation = new Triangulation(points);

draw.triangles(triangles);
draw.points(points);
`;

export default { code, name: 'triangluation' };