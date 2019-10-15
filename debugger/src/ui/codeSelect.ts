import * as modes from '../modes';

class CodeSelect {
  private selectElement: HTMLSelectElement;
  private onChangeCallbacks: { (...arg: any[]): void }[] = [];

  constructor() {
    this.selectElement = <HTMLSelectElement>(
      document.getElementById('debugger-code-select')
    );
    this.addOptions();
    this.selectElement.addEventListener('change', this.onChange);
  }

  addCallback(callback: { (value: string): void }) {
    this.onChangeCallbacks.push(callback);
  }

  private addOptions() {
    const keys: string[] = Object.keys(modes);
    keys.forEach(key => {
      const value: any = (<any>modes)[key];
      const option: HTMLOptionElement = document.createElement('option');
      option.value = value.code;
      option.text = value.name;
      this.selectElement.appendChild(option);
    });
  }

  private onChange = (event: any): void => {
    this.onChangeCallbacks.forEach(callback => {
      callback(event.target.value);
    });
  };
}

export default new CodeSelect();
