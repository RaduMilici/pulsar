import Draw from '../draw';

export default class Canvas {
  readonly draw: Draw;
  private readonly canvasElement: HTMLCanvasElement;

  constructor(container: HTMLElement) {
    this.canvasElement = document.createElement('canvas');
    this.matchSizeToContainer(container);
    container.appendChild(this.canvasElement);
    this.draw = new Draw(this.canvasElement);
  }

  matchSizeToContainer(container: HTMLElement): void {
    const { clientWidth, clientHeight } = container;
    this.canvasElement.width = clientWidth;
    this.canvasElement.height = clientHeight;
  }
}
