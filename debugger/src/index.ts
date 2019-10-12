import './styles';
import { codeSelect, runButton, reloadButton } from './ui';
import * as pulsar from '../../src';
import * as util from './util';
import { Editor, editorConfig, editorDependencies } from './editor';
import { Canvas } from './canvas';
import { triangulationMode, quadTreeMode, pathfindingMode } from './modes';

const editorContainer: HTMLElement = document.getElementById('debugger-editor-container');
const canvasContainer: HTMLElement = document.getElementById('debugger-canvas-container');

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
  value: triangulationMode.code,
  dependencies: [...extraLibs, ...dependencies],
  onChange: [() => { canvas.draw.clear(); }]
};

const editor: Editor = new Editor(editorConfig);
extraLibs.forEach(extraLib => editor.addExtraLibs(extraLib));

const clearAndCompile = () => {
  canvas.draw.clear();
  editor.compile();
}

runButton.addCallback(clearAndCompile);
reloadButton.addCallback(() => {
  editor.reset();
  clearAndCompile();
});
codeSelect.addCallback((value: string): void => {
  editor.setCode(value);
  clearAndCompile();
});
