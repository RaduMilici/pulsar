import * as pulsar from '../../src';
import { Editor } from './editor';
import { Canvas } from './canvas';
import { triangulationMode } from './modes';

const editorContainer: HTMLElement = document.getElementById('editor-container');
const canvasContainer: HTMLElement = document.getElementById('canvas-container');

new Editor(editorContainer, triangulationMode.code, [pulsar]);
new Canvas(canvasContainer);
