import * as pulsar from '../../src';
import * as util from './util';
import { Editor, editorConfig } from './editor';
import { Canvas } from './canvas';
import { triangulationMode } from './modes';

const editorContainer: HTMLElement = document.getElementById('editor-container');
const canvasContainer: HTMLElement = document.getElementById('canvas-container');

const canvas: Canvas = new Canvas(canvasContainer);

const dependencies: { name: string, value: any}[] = [
  { name: 'util', value: util },
  { name: 'draw', value: canvas.draw }
];

// const keys = Object.keys(pulsar);
// keys.forEach( name => {
//   dependencies.push({ name, value: pulsar[name] })
// });

const editorConfig: editorConfig = {
  container: editorContainer,
  value: triangulationMode.code,
  dependencies,
  onChange: [() => { canvas.draw.clear(); }]
};

new Editor(editorConfig);
