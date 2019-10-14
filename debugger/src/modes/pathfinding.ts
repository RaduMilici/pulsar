const code = 
`const size: size = { width: 15, height: 15 };
const grid: Grid = new Grid(size);
const gridPixelWidth: number = 500;

draw.grid(grid, gridPixelWidth);

const begin: NavigatorTile = grid.getTile(new Vector({ x: 0, y: 0 }));
const end: NavigatorTile = grid.getTile(new Vector({ x: 14, y: 14 }));
const settings: navigatorSettings = { 
  grid, 
  begin, 
  end, 
  onComplete: (tiles: NavigatorTile[]) => {
    tiles.forEach((tile: NavigatorTile) => {
      draw.gridTile(grid, tile, gridPixelWidth, '#67dbf8');
    });
  }
};
const navigator: Navigator = new Navigator(settings);
navigator.start();
`;

export default { code, name: 'pathfinding' };