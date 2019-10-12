import './styles/editor.css';
import * as pulsar from '../../src';
import * as util from './util';
import { Editor, editorConfig, editorDependencies } from './editor';
import { Canvas } from './canvas';
import { triangulationMode, quadTreeMode } from './modes';

const editorContainer: HTMLElement = document.getElementById('editor-container');
const canvasContainer: HTMLElement = document.getElementById('canvas-container');

const canvas: Canvas = new Canvas(canvasContainer);
const extraLibs: editorDependencies[] = [
  { name: 'util', value: util },
  { name: 'draw', value: canvas.draw }
];

const keys: string[] = Object.keys(pulsar);
const dependencies: editorDependencies[] = keys.map(name => {
  const value: any = (<any>pulsar)[name];
  return { name, value };
});

const editorConfig: editorConfig = {
  container: editorContainer,
  value: quadTreeMode.code,
  dependencies: [...extraLibs, ...dependencies],
  onChange: [() => { canvas.draw.clear(); }]
};

const editor: Editor = new Editor(editorConfig);
extraLibs.forEach(extraLib => editor.addExtraLibs(extraLib));