const code = `const size: Pulsar.size = { width: 30, height: 30 };
const grid: Pulsar.Grid = new Pulsar.Grid(size);
draw.grid(grid);

for (let y = 1; y < 30 - 1; y += 2) {
  for (let x = 0; x < 30; x++) {    
	  const gateNumber: number = Math.round(Math.sin(x + y));
    if (gateNumber > 0) {
      continue;
    }
    else {
      const obstacle: Pulsar.NavigatorTile = grid.getTile({ x, y });
      grid.obstacles.add(obstacle);
    }
  }
}

draw.gridTiles(grid, grid.obstacles.list, '#FF6103');

const begin: Pulsar.NavigatorTile = grid.getTile(new Pulsar.Vector({ x: 0, y: 0 }));
const end: Pulsar.NavigatorTile = grid.getTile(new Pulsar.Vector({ x: 29, y: 29 }));
const onComplete = (tiles: Pulsar.NavigatorTile[]) => {
  tiles.forEach((tile: Pulsar.NavigatorTile) => {
    draw.gridTile(grid, tile, '#67dbf8');
  });
};

const settings: Pulsar.navigatorSettings = { grid, begin, end, onComplete };
const agent: Pulsar.Navigator = new Pulsar.Navigator(settings);
agent.start();
`;

export default { code, name: 'pathfinding' };
