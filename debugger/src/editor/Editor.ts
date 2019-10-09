import * as monaco from 'monaco-editor';
import editorConfig from './editorConfig';
import editorDependencies from './editorDependencies';


export default class Editor {
  private editor: any;
  private dependencies: editorDependencies[];
  private dependencyNames: string[];
  private dependencyValues: any[];

  constructor({ container, value, dependencies }: editorConfig) {
    this.editor = monaco.editor.create(container, {
      value,
      language: 'typescript',
      fontSize: 16,
    });
    this.dependencies = dependencies;
    monaco.editor.setTheme('vs-dark');
    this.setDependencyNameValue();
    this.addExtraLibs();
    this.editor.onDidChangeModelContent(this.compile);
    this.compile();
  }

  compile = async () => {    
    const woker: any = await monaco.languages.typescript.getTypeScriptWorker();
    const proxy: any = await woker(this.editor.getModel().uri);
    const result: any = await proxy.getEmitOutput(this.editor.getModel().uri.toString());
    const code: string = result.outputFiles[0].text;
    this.executeCompiledCode(code);
  }

  private setDependencyNameValue() {
    this.dependencyNames = this.dependencies.map(({ name }: editorDependencies) => name);
    this.dependencyValues = this.dependencies.map(({ value }: editorDependencies) => value);
  }

  private addExtraLibs(): void {
    this.dependencyNames.forEach((name: string) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare var ${name}: any;`);
    })
  }

  private executeCompiledCode(code: string): void  {
    const compileFunction: Function = new Function(...this.dependencyNames, code);
    compileFunction.apply(null, this.dependencyValues);
  }
}