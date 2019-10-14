const code = 
`draw.drawGrid.pixelWidth = 800;
const size: size = { width: 50, height: 50 };
const grid: Grid = new Grid(size);
draw.grid(grid);

grid.obstacles.addRandom(800);
draw.gridTiles(grid, grid.obstacles.list, '#FF6103');

const begin: NavigatorTile = grid.getTile(new Vector({ x: 0, y: 0 }));
const end: NavigatorTile = grid.getTile(new Vector({ x: 49, y: 49 }));
const onComplete = (tiles: NavigatorTile[]) => {
  tiles.forEach((tile: NavigatorTile) => {
    draw.gridTile(grid, tile, '#67dbf8');
  });
};

const settings: navigatorSettings = { grid, begin, end, onComplete };
const navigator: Navigator = new Navigator(settings);
navigator.start();

`;

export default { code, name: 'pathfinding - random' };