import NavigatorTile from './NavigatorTile';
import Vector from '../../common/Vector';

describe('NavigatorTile', () => {
    let tile: NavigatorTile;
    let position: Vector;

    beforeEach(() => {
        position = new Vector({ x: 1, y: 1 });
        tile = new NavigatorTile(position);
    });

    test('constructor should initialize position', () => {
        expect(tile.position).toEqual(position);
    });

    test('distanceTo should return correct distance', () => {
        const otherTile = new NavigatorTile(new Vector({ x: 2, y: 1 }));
        expect(tile.distanceTo(otherTile)).toBe(1);
    });

    test('equals should return true if positions are equal', () => {
        const otherTile = new NavigatorTile(new Vector({ x: 1, y: 1 }));
        expect(tile.equals(otherTile)).toBe(true);
    });

    test('isNeighbour should return true for vertical neighbour', () => {
        const otherTile = new NavigatorTile(new Vector({ x: 1, y: 2 }));
        expect(tile.isNeighbour(otherTile)).toBe(true);
    });

    test('isNeighbour should return true for diagonal neighbour', () => {
        const otherTile = new NavigatorTile(new Vector({ x: 2, y: 2 }));
        expect(tile.isNeighbour(otherTile)).toBe(true);
    });

    test('isDiagonal should return true for diagonal neighbour', () => {
        const otherTile = new NavigatorTile(new Vector({ x: 2, y: 2 }));
        expect(tile.isDiagonal(otherTile)).toBe(true);
    });

    test('isDiagonal should return false for non-diagonal neighbour', () => {
        const otherTile = new NavigatorTile(new Vector({ x: 1, y: 2 }));
        expect(tile.isDiagonal(otherTile)).toBe(false);
    });

    test('isAdjacent should return true for adjacent neighbour', () => {
        const otherTile = new NavigatorTile(new Vector({ x: 1, y: 2 }));
        expect(tile.isAdjacent(otherTile)).toBe(true);
    });

    test('isAdjacent should return false for non-adjacent neighbour', () => {
        const otherTile = new NavigatorTile(new Vector({ x: 2, y: 2 }));
        expect(tile.isAdjacent(otherTile)).toBe(false);
    });
});
