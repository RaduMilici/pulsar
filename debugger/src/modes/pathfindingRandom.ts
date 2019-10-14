const code = `const size: Pulsar.size = { width: 50, height: 50 };
const grid: Pulsar.Grid = new Pulsar.Grid(size);
draw.grid(grid);

grid.obstacles.addRandom(800);
draw.gridTiles(grid, grid.obstacles.list, '#FF6103');

const begin: Pulsar.NavigatorTile = grid.getTile(new Pulsar.Vector({ x: 0, y: 0 }));
const end: Pulsar.NavigatorTile = grid.getTile(new Pulsar.Vector({ x: 49, y: 49 }));
const onComplete = (tiles: Pulsar.NavigatorTile[]) => {
  tiles.forEach((tile: Pulsar.NavigatorTile) => {
    draw.gridTile(grid, tile, '#67dbf8');
  });
};

const settings: Pulsar.navigatorSettings = { grid, begin, end, onComplete };
const agent: Pulsar.Navigator = new Pulsar.Navigator(settings);
agent.start();

`;

export default { code, name: 'pathfinding - random' };
