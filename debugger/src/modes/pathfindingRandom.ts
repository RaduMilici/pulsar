const code = `const size = { width: 50, height: 50 };
const grid = new Pulsar.Grid(size);
draw.grid(grid);

grid.obstacles.addRandom(800);
draw.gridTiles(grid, grid.obstacles.list, '#FF6103');

const begin = grid.getTile(new Pulsar.Vector({ x: 0, y: 0 }));
const end = grid.getTile(new Pulsar.Vector({ x: 49, y: 49 }));
const onComplete = tiles => {
  tiles.forEach(tile => {
    draw.gridTile(grid, tile, '#67dbf8');
  });
};

const settings = { grid, begin, end, onComplete };
const agent = new Pulsar.Navigator(settings);
agent.start();

`;

export default { code, name: 'pathfinding - random' };
