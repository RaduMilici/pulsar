export default class Canvas {
  private readonly canvasElement: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  constructor(container: HTMLElement) {
    this.canvasElement = document.createElement('canvas');
    this.matchSizeToContainer(container);
    this.context = this.canvasElement.getContext('2d');
    container.appendChild(this.canvasElement);
  }

  matchSizeToContainer(container: HTMLElement): void {
    const { clientWidth, clientHeight } = container;
    this.canvasElement.width  = clientWidth;
    this.canvasElement.height = clientHeight;
    this.canvasElement.style.width = `${clientWidth}`;
    this.canvasElement.style.height = `${clientHeight}`;
  }
}