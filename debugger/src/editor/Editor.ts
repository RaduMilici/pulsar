import * as monaco from 'monaco-editor';
import { editorConfig, editorDependencies } from './types';
import dtsBundle from './dtsBundle';

export default class Editor {
  private editor: any;
  private dependencyNames: string[] = [];
  private dependencyValues: any[] = [];
  private value: string;

  constructor(config: editorConfig) {
    this.value = config.value;
    this.editor = this.createEditor(config);
    this.setDependencies(config.dependencies);
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
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare const ${name}: any`);
  }

  private setDependencies(dependencies: editorDependencies[]): void {
    dependencies.forEach(({ name, value }: editorDependencies) => {
      this.dependencyNames.push(name);
      this.dependencyValues.push(value);
    });
  }

  private createEditor({ container, value }: editorConfig): any {
    monaco.editor.setTheme('vs-dark');
    monaco.languages.typescript.typescriptDefaults.addExtraLib(dtsBundle);
    return monaco.editor.create(container, {
      value,
      language: 'typescript',
      fontSize: 18,
      wordWrap: 'on',
      wrappingIndent: 'indent',
    });
  }

  private executeCompiledCode(code: string): void {
    const compileFunction: Function = new Function(...this.dependencyNames, code);
    compileFunction.apply(null, this.dependencyValues);
  }
}
