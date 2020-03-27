import './styles';
import { codeSelect, runButton, reloadButton } from './ui';
import * as pulsar from '../../src';
import * as modes from './modes';
import { Editor, editorConfig, editorDependencies } from './editor';
import { Canvas } from './canvas';

const editorContainer: HTMLElement = document.getElementById('debugger-editor-container');
const canvasContainer: HTMLElement = document.getElementById('debugger-canvas-container');

const canvas: Canvas = new Canvas(canvasContainer);
const extraLibs: editorDependencies[] = [{ name: 'draw', value: canvas.draw }, { name: 'Pulsar', value: pulsar }];

const editorConfig: editorConfig = {
  container: editorContainer,
  value: modes.updater.code,
  dependencies: [...extraLibs],
};

const editor: Editor = new Editor(editorConfig);
editor.addExtraLibsAsAny({ name: 'draw', value: canvas.draw });

const clearAndCompile = () => {
  canvas.draw.clear();
  editor.compile();
};
runButton.addCallback(clearAndCompile);
reloadButton.addCallback(() => {
  editor.reset();
  clearAndCompile();
});
codeSelect.addCallback((value: string): void => {
  editor.setValue(value);
  clearAndCompile();
});
