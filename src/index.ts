import Canvas from './classes/Canvas';
import Grid from './classes/Grid';
import Click from './classes/Click';
import Navigator from './classes/Navigator';
import NavigatorTile from './classes/NavigatorTile';
import size from 'interfaces/size';
// import { color } from "./util/random";

const canvasSize: size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas: Canvas = new Canvas('#canvas', canvasSize);
const gridSize: size = { width: 100, height: 75 };
const tileSize: size = { width: 10, height: 10 };
const grid: Grid = new Grid(gridSize);
new Click(canvas.canvas, grid);
canvas.drawGrid(gridSize, tileSize);

const onNavExplore = ({ position }: NavigatorTile) => {
  const tile = canvas.getTile(position);
  tile.fill('blue');
  tile.stroke();
};
const onNavComplete = (path: NavigatorTile[]): void => {
  path.forEach(({ position }: NavigatorTile) => {
    const tile = canvas.getTile(position);
    tile.fill('green');
    tile.stroke();
  });
};

grid.obstacles.addRandom(3000);

grid.obstacles.list.forEach(({ position }: NavigatorTile) => {
  const tile = canvas.getTile(position);
  tile.fill('black');
  tile.stroke();
});

for (let i = 0; i < 20; i++) {
  const navBegin: NavigatorTile = grid.randomFreeTile();
  const navEnd: NavigatorTile = grid.randomFreeTile();
  const navigator: Navigator = new Navigator(
    grid,
    navBegin,
    navEnd,
    onNavExplore,
    onNavComplete
  );
  navigator.start();
}
