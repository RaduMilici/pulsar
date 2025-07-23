import { Grid } from '../Grid';
import NavigatorTile from '../NavigatorTile/NavigatorTile';
import Vector from '../../common/Vector';
import I_NavigatorTile from '../NavigatorTile/I_NavigatorTile';
import { DEFAULT_GRID_SIZE, MIN_GRID_SIZE_ERROR } from '../../constants';

describe('Grid', () => {
    test('initializes with default grid size', () => {
        const grid = new Grid();
        expect(grid.size).toEqual(DEFAULT_GRID_SIZE);
    });

    test('throws error for minimum grid size', () => {
        expect(() => new Grid({ width: 0, height: 0 })).toThrowError(MIN_GRID_SIZE_ERROR);
    });

    test('creates grid with correct number of tiles', () => {
        const grid = new Grid({ width: 5, height: 5 });
        expect(grid.tiles.length).toBe(25);
    });

    test('creates grid with correct number of rows', () => {
        const grid = new Grid({ width: 5, height: 5 });
        expect(grid.rows.length).toBe(5);
    });

    test('getTile returns correct tile', () => {
        const grid = new Grid({ width: 5, height: 5 });
        const tile: I_NavigatorTile = grid.getTile({ x: 1, y: 1 });
        expect(tile).toBeInstanceOf(NavigatorTile);
        expect(tile.position).toEqual(new Vector({ x: 1, y: 1 }));
    });

    test('getTile returns null for out of bounds', () => {
        const grid = new Grid({ width: 5, height: 5 });
        const tile: I_NavigatorTile | null = grid.getTile({ x: -1, y: -1 });
        expect(tile).toBeNull();
    });

    test('getRandomTile returns valid tile', () => {
        const grid = new Grid({ width: 5, height: 5 });
        const tile: I_NavigatorTile = grid.getRandomTile();
        expect(tile).toBeInstanceOf(NavigatorTile);
    });

    test('getRandomFreeTile returns valid non-obstacle tile', () => {
        const grid = new Grid({ width: 5, height: 5 });
        const tile: I_NavigatorTile | null = grid.getRandomFreeTile();
        expect(tile).toBeInstanceOf(NavigatorTile);
        expect(tile.isObstacle).toBe(false);
    });
});
