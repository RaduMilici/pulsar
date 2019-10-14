const code = 
`const size: size = { width: 15, height: 15 };
const grid: Grid = new Grid(size);

draw.grid(grid);

const begin: NavigatorTile = grid.getTile(new Vector({ x: 0, y: 0 }));
const end: NavigatorTile = grid.getTile(new Vector({ x: 14, y: 14 }));
const onComplete = (tiles: NavigatorTile[]) => {
  tiles.forEach((tile: NavigatorTile) => {
    draw.gridTile(grid, tile, '#67dbf8');
  });
};

const settings: navigatorSettings = { grid,  begin, end,  onComplete };
const navigator: Navigator = new Navigator(settings);
navigator.start();
`;

export default { code, name: 'pathfinding' };