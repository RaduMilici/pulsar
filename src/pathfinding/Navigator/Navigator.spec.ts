import Grid from '../Grid/Grid';
import Navigator from './Navigator';
import NavigatorTile from '../NavigatorTile/NavigatorTile';

describe('Navigator', () => {
    let grid: Grid;
    let begin: NavigatorTile;
    let end: NavigatorTile;

    beforeEach(() => {
        grid = new Grid({ width: 10, height: 10 });
        begin = grid.getTile({ x: 0, y: 0 }) as NavigatorTile;
        end = grid.getTile({ x: 9, y: 9 }) as NavigatorTile;
    });

    test('should instantiate a Navigator with the correct properties', () => {
        const onExplore = jest.fn();
        const onComplete = jest.fn();
        const maxSteps = 100;
        const navigator = new Navigator({ grid, begin, end, onExplore, onComplete, maxSteps });

        expect(navigator).toBeInstanceOf(Navigator);
        expect(navigator.path).toEqual([]);
    });

    test('start() should return false if the destination tile is an obstacle', () => {
        end.isObstacle = true;
        const navigator = new Navigator({ grid, begin, end });

        const result = navigator.start();
        expect(result).toBe(false);
    });

    test('start() should return true and navigate successfully without obstacles', () => {
        const navigator = new Navigator({ grid, begin, end });

        const result = navigator.start();
        expect(result).toBe(true);

        const path = navigator.path;
        expect(path).toBeInstanceOf(Array);
        expect(path.length).toBeGreaterThan(0);
        expect(path[0].position).toBe(begin.position);
        expect(path[path.length - 1].position).toBe(end.position);
    });

    test('onExplore() and onComplete() should be called during navigation', () => {
        const onExplore = jest.fn();
        const onComplete = jest.fn();

        const navigator = new Navigator({ grid, begin, end, onExplore, onComplete });
        navigator.start();

        expect(onExplore).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalled();
    });
});
