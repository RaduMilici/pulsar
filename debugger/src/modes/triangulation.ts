const code = 
`const limits = {
  top: 300,
  bottom: -300,
  left: -300,
  right: 300,
};
const points: Vector[] = util.random.points(20, limits);
const { triangles }: Triangulation = new Triangulation(points);

draw.triangles(triangles);
draw.points(points);
`;

export default { code, name: 'triangluation' };