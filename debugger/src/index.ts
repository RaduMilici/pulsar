import Editor from './Editor';
import * as pulsar from '../../src';
const container: HTMLElement = document.getElementById('container');
const code = 
`const { Vector } = pulsar;
const a = new Vector({ x: 3, y: 7 });
const b = new Vector({ x: 5, y: 1 });
const magnitude: number = a.add(b).magnitude();
console.log(a, b, magnitude);
`;
new Editor(container, code, [pulsar]);
