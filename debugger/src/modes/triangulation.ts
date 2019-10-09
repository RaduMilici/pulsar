const code = 
`const { Triangulation, Vector, Line } = pulsar;
const a = new Vector({ x: 3, y: 7 });
const b = new Vector({ x: 5, y: 1 });
const magnitude: number = a.add(b).magnitude();
console.log(a, b, magnitude);
`;

export default { code };