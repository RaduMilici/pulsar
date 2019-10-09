import * as pulsar from '../../src';
import * as util from './util';
import { Editor, editorConfig } from './editor';
import { Canvas } from './canvas';
import { triangulationMode } from './modes';

const editorContainer: HTMLElement = document.getElementById('editor-container');
const canvasContainer: HTMLElement = document.getElementById('canvas-container');

const editorConfig: editorConfig = {
  container: editorContainer,
  value: triangulationMode.code,
  dependencies: [{ name: 'pulsar', value: pulsar }, { name: 'util', value: util }]
};

new Editor(editorConfig);
new Canvas(canvasContainer);
