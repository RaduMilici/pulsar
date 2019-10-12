class RunButton {
  private buttonElement: HTMLButtonElement;
  private onClickCallbacks: { (): void; }[] = [];

  constructor() {
    this.buttonElement = <HTMLButtonElement>document.getElementById('debugger-run-button');
    this.buttonElement.addEventListener('click', this.onClick)
  }

  addCallback(callback: { (): void; }) {
    this.onClickCallbacks.push(callback);
  }

  private onClick = (): void => {
    this.buttonElement.disabled = true;
    this.onClickCallbacks.forEach(callback => {
      callback();
    });
    this.buttonElement.disabled = false;
  }
}

export default new RunButton();
