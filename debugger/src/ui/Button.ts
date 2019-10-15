export default abstract class Button {
  private buttonElement: HTMLButtonElement;
  private onClickCallbacks: { (): void }[] = [];

  constructor(selector: string) {
    this.buttonElement = <HTMLButtonElement>document.querySelector(selector);
    this.buttonElement.addEventListener('click', this.onClick);
  }

  addCallback(callback: { (): void }) {
    this.onClickCallbacks.push(callback);
  }

  private onClick = (): void => {
    this.buttonElement.disabled = true;
    this.onClickCallbacks.forEach(callback => {
      callback();
    });
    this.buttonElement.disabled = false;
  };
}
