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
      fontSize: 14,
      wordWrap: 'on',
      wrappingIndent: 'indent'
    });
    this.dependencies = dependencies;
    monaco.editor.setTheme('vs-dark');
    this.setDependencyNameValue();
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      lib: ['DOM' , 'ES6', 'DOM.Iterable', 'ScriptHost'],
      //noLib: true,
      allowNonTsExtensions: true
    });
    monaco.languages.typescript.typescriptDefaults.addExtraLib(dtsBundle);
    /*this.editor.onDidChangeModelContent(() => {
      onChange.forEach(callback => callback());
      this.compile();
    });*/
    this.compile();
  }

  reset = () => {
    this.setCode(this.value);
  }

  compile = async () => {    
    const woker: any = await monaco.languages.typescript.getTypeScriptWorker();
    const proxy: any = await woker(this.editor.getModel().uri);
    const result: any = await proxy.getEmitOutput(this.editor.getModel().uri.toString());
    const code: string = result.outputFiles[0].text;
    this.executeCompiledCode(code);
  }

  setCode = (value: string): void => {
    this.value = value;
    this.editor.setValue(this.value);
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