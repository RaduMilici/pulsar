import Editor from './Editor';
import Canvas from './canvas/Canvas';
import * as pulsar from '../../src';
const editorContainer: HTMLElement = document.getElementById('editor-container');
const canvasContainer: HTMLElement = document.getElementById('canvas-container');
const code = 
`const { Vector } = pulsar;
const a = new Vector({ x: 3, y: 7 });
const b = new Vector({ x: 5, y: 1 });
const magnitude: number = a.add(b).magnitude();
console.log(a, b, magnitude);
`;
new Editor(editorContainer, code, [pulsar]);
new Canvas(canvasContainer);
