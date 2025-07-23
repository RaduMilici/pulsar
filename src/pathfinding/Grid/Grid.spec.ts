import Grid from './Grid';
import { DEFAULT_GRID_SIZE, MIN_GRID_SIZE_ERROR } from '../../constants';
import Obstacles from '../Obstacles/Obstacles';
import NavigatorTile from '../NavigatorTile/NavigatorTile';
import Vector from '../../common/Vector';
import { point } from '../../interfaces';

describe('Grid', () => {
    test('should initialize with default size if not provided', () => {
        const grid = new Grid();
        expect(grid.size).toEqual(DEFAULT_GRID_SIZE);
    });

    test('should initialize with provided size', () => {
        const customSize = { width: 10, height: 8 };
        const grid = new Grid(customSize);
        expect(grid.size).toEqual(customSize);
    });

    test('should throw an error if size is not valid', () => {
        expect(() => new Grid({ width: 0, height: 0 })).toThrowError(MIN_GRID_SIZE_ERROR);
    });

    test('should initialize obstacles', () => {
        const grid = new Grid();
        expect(grid.obstacles).toBeInstanceOf(Obstacles);
    });

    test('should create a grid of NavigatorTile instances', () => {
        const grid = new Grid();
        grid.rows.forEach(row => {
            row.forEach(tile => {
                expect(tile).toBeInstanceOf(NavigatorTile);
            });
        });
    });

    describe('getTile', () => {
        test('should return the correct tile for valid coordinates', () => {
            const grid = new Grid();
            const tileCoordinates: point = { x: 2, y: 3 };
            const tile = grid.getTile(tileCoordinates);
            expect(tile).toBeInstanceOf(NavigatorTile);
            expect(tile.position).toEqual(new Vector(tileCoordinates));
        });

        test('should return null for invalid coordinates', () => {
            const grid = new Grid();
            const invalidCoordinates: point = { x: -1, y: -1 };
            expect(grid.getTile(invalidCoordinates)).toBeNull();
        });
    });

    describe('getRandomTile', () => {
        test('should return a random tile', () => {
            const grid = new Grid();
            const randomTile = grid.getRandomTile();
            expect(randomTile).toBeInstanceOf(NavigatorTile);
            expect(grid.tiles).toContain(randomTile);
        });
    });

    describe('getRandomFreeTile', () => {
        test('should return a random non-obstacle tile', () => {
            const grid = new Grid();
            const randomFreeTile = grid.getRandomFreeTile();
            expect(randomFreeTile).toBeInstanceOf(NavigatorTile);
            expect(grid.tiles).toContain(randomFreeTile);
            expect(randomFreeTile.isObstacle).toBeFalsy();
        });
    });
});
