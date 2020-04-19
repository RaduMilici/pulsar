const code = `const size: Pulsar.size = { width: 30, height: 30 };
const grid = new Pulsar.Grid(size);
draw.grid(grid);

for (let y = 1; y < 30 - 1; y += 2) {
  for (let x = 0; x < 30; x++) {    
	  const gateNumber: number = Math.round(Math.sin(x + y));
    if (gateNumber > 0) {
      continue;
    }
    else {
      const obstacle = grid.getTile({ x, y });
      grid.obstacles.add(obstacle);
    }
  }
}

draw.gridTiles(grid, grid.obstacles.list, '#FF6103');

const begin = grid.getTile(new Pulsar.Vector({ x: 0, y: 0 }));
const end = grid.getTile(new Pulsar.Vector({ x: 29, y: 29 }));
const onComplete = tiles => {
  tiles.forEach(tile => {
    draw.gridTile(grid, tile, '#67dbf8');
  });
};

const settings = { grid, begin, end, onComplete };
const agent = new Pulsar.Navigator(settings);
agent.start();
`;

export default { code, name: 'pathfinding' };
