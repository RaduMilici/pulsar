import * as monaco from 'monaco-editor';
import editorConfig from './editorConfig';
import editorDependencies from './editorDependencies';
import dtsBundle from './dtsBundle';

export default class Editor {
  private editor: any;
  private dependencies: editorDependencies[];
  private dependencyNames: string[];
  private dependencyValues: any[];

  constructor({ container, value, dependencies, onChange }: editorConfig) {
    this.editor = monaco.editor.create(container, {
      value,
      language: 'typescript',
      fontSize: 14,
      wordWrap: 'on',
      wrappingIndent: 'indent'
    });
    this.dependencies = dependencies;
    monaco.editor.setTheme('vs-dark');
    this.setDependencyNameValue();
    monaco.languages.typescript.typescriptDefaults.addExtraLib(dtsBundle);
    /*this.editor.onDidChangeModelContent(() => {
      onChange.forEach(callback => callback());
      this.compile();
    });*/
    this.compile();
  }

  compile = async () => {    
    const woker: any = await monaco.languages.typescript.getTypeScriptWorker();
    const proxy: any = await woker(this.editor.getModel().uri);
    const result: any = await proxy.getEmitOutput(this.editor.getModel().uri.toString());
    const code: string = result.outputFiles[0].text;
    this.executeCompiledCode(code);
  }

  setCode(value: string): void {
    this.editor.setValue(value);
  }

  private setDependencyNameValue() {
    this.dependencyNames = this.dependencies.map(({ name }: editorDependencies) => name);
    this.dependencyValues = this.dependencies.map(({ value }: editorDependencies) => value);
  }

  addExtraLibs({ name }: editorDependencies) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare const ${name}: any`
    );
  }

  private executeCompiledCode(code: string): void  {
    const compileFunction: Function = new Function(...this.dependencyNames, code);
    compileFunction.apply(null, this.dependencyValues);
  }
}