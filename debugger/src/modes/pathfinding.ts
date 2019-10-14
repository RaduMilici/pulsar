const code = 
`const size: size = { width: 15, height: 15 };
const grid: Grid = new Grid(size);

draw.grid(grid, 500);

const begin: NavigatorTile = grid.getTile(new Vector({ x: 0, y: 0 }));
const end: NavigatorTile = grid.getTile(new Vector({ x: 14, y: 14 }));
const settings: navigatorSettings = { grid, begin, end,
  onComplete: (path: NavigatorTile[]) => {
    console.log(path);
  }
};
const navigator: Navigator = new Navigator(settings);
navigator.start();
`;

export default { code, name: 'pathfinding' };