import Grid from './Grid';
import Tile from './Tile';

export default class Click {
  constructor(private canvas: HTMLCanvasElement, private grid: Grid) {
    this.addEvent();
  }

  addEvent(): void {
    this.canvas.addEventListener('click', this.onClick.bind(this), false);
    this.canvas.addEventListener('contextmenu', this.onClick.bind(this), false);
  }

  onClick(event: MouseEvent): boolean {
    event.preventDefault();
    const clickedTile: Tile | null = null; //this.grid.findTileByPixelCoords(event);

    if (clickedTile) {
      switch (event.button) {
        case 0:
          //this.grid.setStart(clickedTile.navigatorTile);
          break;
        case 2:
          //this.grid.setStart(clickedTile.navigatorTile);
          break;
      }
    }

    return false;
  }
}
