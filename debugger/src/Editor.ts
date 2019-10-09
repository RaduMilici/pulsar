import * as monaco from 'monaco-editor';

export default class Editor {
  editor: any;

  constructor(
    container: HTMLElement, 
    value: string = '', 
    readonly dependencies: any[] = []
  ) {
    this.editor = monaco.editor.create(container, {
      value,
      language: 'typescript',
      fontSize: 16,
    });
    monaco.editor.setTheme('vs-dark');
    monaco.languages.typescript.typescriptDefaults.addExtraLib('declare var pulsar: any;');
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

  private executeCompiledCode(code: string) {
    const compileFunction: Function = new Function('pulsar', code);
    compileFunction.apply(null, this.dependencies);
  }
}