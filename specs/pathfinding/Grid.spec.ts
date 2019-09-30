import Grid from '../../src/pathfinding/Grid';
import { size } from '../../src/interfaces';
import { MIN_GRID_SIZE_ERROR } from '../../src/constants'

describe('pathfinding / Grid', () => {
  it('throws an error if size is invalid', () => {
    const invalidSize: size = { width: 0, height: 0 };
    expect(() => {
      new Grid(invalidSize);
    }).toThrow(new Error(MIN_GRID_SIZE_ERROR));
  });


});