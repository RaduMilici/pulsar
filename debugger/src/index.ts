import * as monaco from 'monaco-editor';
const a: number = 3;
const container: HTMLElement = document.getElementById('container');
const code = `
function x(): void {
  console.log('hello world!');
}

x();
`;

monaco.editor.create(container, {
  value: code,
  language: 'typescript'
});