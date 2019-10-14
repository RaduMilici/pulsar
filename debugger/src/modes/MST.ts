const code = 
`const limits = {
  top: 300,
  bottom: -300,
  left: -300,
  right: 300,
};
const points: Vector[] = util.random.points(20, limits);
const { MST }: Triangulation = new Triangulation(points);
MST.start();
draw.lines(MST.lines);
draw.points(points);
`;

export default { code, name: 'MST' };