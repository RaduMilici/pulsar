import size from '../interfaces/size';
import point from '../interfaces/point';
import id from '../interfaces/id';
import uniqueId from '../util/uniqueID';
import NavigatorTile from '../classes/NavigatorTile';
import { start, obstacle, outline, empty } from '../const/colors';

export default class Tile implements id {
  id: number = uniqueId();
  navigatorTile: NavigatorTile | null = null;
  private _isObstacle: boolean = false;
  private _isStart: boolean = false;

  constructor(
    public size: size,
    private position: point,
    private _gridCoords: point,
    private context: CanvasRenderingContext2D
  ) {
    this.navigatorTile = new NavigatorTile(_gridCoords);
    this.stroke(outline);
  }

  get isObstacle(): boolean {
    return this._isObstacle;
  }

  get isStart(): boolean {
    return this._isStart;
  }
  get canBeStart(): boolean {
    return !this.isObstacle && !this.isStart;
  }
  get gridCoords(): point {
    return this._gridCoords;
  }

  becomeStart(): boolean {
    if (!this.canBeStart) {
      return false;
    }

    this.fill(start);
    this.stroke(outline);

    return true;
  }

  reset() {
    this._isStart = false;
    this.fill(empty);
    this.stroke(outline);
  }

  becomeObstacle(): void {
    this._isObstacle = true;
    this.fill(obstacle);
  }

  containsPoint({ x, y }: point): boolean {
    return (
      x >= this.position.x &&
      x <= this.position.x + this.size.width &&
      y >= this.position.y &&
      y <= this.position.y + this.size.height
    );
  }

  fill(color: string): void {
    this.draw(() => {
      this.context.fillStyle = color;
      this.context.fill();
    });
  }

  stroke(color: string = 'black'): void {
    this.draw(() => {
      this.context.strokeStyle = color;
      this.context.lineWidth = 1;
      this.context.stroke();
    });
  }

  private draw(drawAction: () => void): void {
    const { x, y } = this.position;
    const { width, height } = this.size;
    this.context.beginPath();
    //this.context.arc(x, y , width, 0, 2*Math.PI);
    this.context.rect(x, y, width, height);
    drawAction();
    this.context.closePath();
  }
}
