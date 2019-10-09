import editorDependencies from './editorDependencies';

type editorConfig = {
  container: HTMLElement;
  value: string; 
  dependencies: editorDependencies[];
  onChange: Function[];
}

export default editorConfig;
