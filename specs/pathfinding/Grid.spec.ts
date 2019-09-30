import Grid from '../../src/pathfinding/Grid';
import { size } from '../../src/interfaces';
import { MIN_GRID_SIZE_ERROR } from '../../src/constants';

describe('pathfinding / Grid', () => {
  describe('creating the grid', () => {
    it('throws an error if size is invalid', () => {
      const invalidSize: size = { width: 0, height: 0 };
      expect(() => {
        new Grid(invalidSize);
      }).toThrow(new Error(MIN_GRID_SIZE_ERROR));
    });

    it('stores all tiles in an array with length equal to grid width times height', () => {
      const size: size = { width: 5, height: 5 };
      const grid: Grid = new Grid(size);
      expect(grid.tiles.length).toBe(25);
    });

    it('stores all rows in an array with length equal to grid height', () => {
      const size: size = { width: 4, height: 9 };
      const grid: Grid = new Grid(size);
      expect(grid.rows.length).toBe(9);
    });
  });
});
