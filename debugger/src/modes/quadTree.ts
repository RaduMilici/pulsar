const code = 
`const limits = {
  top: 300,
  bottom: -300,
  left: -300,
  right: 300,
};
const points: Vector[] = util.random.points(20, limits);
const box: BoundingBox = new BoundingBox(points);
box.growBy(20);
const { topLeft, topRight, bottomRight, bottomLeft } = box;
const quadShape = new Shape([topLeft, topRight, bottomRight, bottomLeft]);
const quadTree = new QuadTree(quadShape, points);

draw.points(points);
draw.quadTree(quadTree);
`;

export default { code, name: 'quad tree' };