import * as monaco from 'monaco-editor';
import editorConfig from './editorConfig';
import editorDependencies from './editorDependencies';
import dtsBundle from './dtsBundle';

export default class Editor {
  private editor: any;
  private dependencies: editorDependencies[];
  private dependencyNames: string[];
  private dependencyValues: any[];
  private value: string;

  constructor({ container, value, dependencies, onChange }: editorConfig) {
    this.value = value;
    this.editor = monaco.editor.create(container, {
      value,
      language: 'typescript',
      fontSize: 18,
      wordWrap: 'on',
      wrappingIndent: 'indent'
    });
    this.dependencies = dependencies;
    monaco.editor.setTheme('vs-dark');
    this.setDependencies();
    monaco.languages.typescript.typescriptDefaults.addExtraLib(dtsBundle);
    this.compile();
  }

  reset() {
    this.setValue(this.value);
  }

  async compile(): Promise<any> {    
    const woker = await monaco.languages.typescript.getTypeScriptWorker();
    const proxy = await woker(this.editor.getModel().uri);
    const result = await proxy.getEmitOutput(this.editor.getModel().uri.toString());
    const code: string = result.outputFiles[0].text;
    this.executeCompiledCode(code);
  }

  setValue(value: string): void {
    this.value = value;
    this.editor.setValue(this.value);
  }

  addExtraLibsAsAny({ name }: editorDependencies) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare const ${name}: any`
    );
  }

  private setDependencies(): void {
    this.dependencyNames = this.dependencies.map(({ name }: editorDependencies) => name);
    this.dependencyValues = this.dependencies.map(({ value }: editorDependencies) => value);
  }

  private executeCompiledCode(code: string): void  {
    const compileFunction: Function = new Function(...this.dependencyNames, code);
    compileFunction.apply(null, this.dependencyValues);
  }
}