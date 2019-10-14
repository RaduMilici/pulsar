const code = 
`draw.drawGrid.pixelWidth = 800;
const width: number = 50;
const height: number = 50;
const size: size = { width, height };
const grid: Grid = new Grid(size);
draw.grid(grid);

for (let y = 1; y < height - 1; y += 2) {
  for (let x = 0; x < width; x++) {    
	  const gateNumber: number = Math.round(Math.sin(x + y));
    if (gateNumber > 0) {
      continue;
    }
    else {
      const obstacle: NavigatorTile = grid.getTile({ x, y });
      grid.obstacles.add(obstacle);
    }
  }
}

draw.gridTiles(grid, grid.obstacles.list, '#FF6103');

const begin: NavigatorTile = grid.getTile(new Vector({ x: 0, y: 0 }));
const end: NavigatorTile = grid.getTile(new Vector({ x: width - 1, y: height - 1 }));
const onComplete = (tiles: NavigatorTile[]) => {
  tiles.forEach((tile: NavigatorTile) => {
    draw.gridTile(grid, tile, '#67dbf8');
  });
};

const settings: navigatorSettings = { grid, begin, end, onComplete };
const navigator: Navigator = new Navigator(settings);
navigator.start();

`;

export default { code, name: 'pathfinding' };