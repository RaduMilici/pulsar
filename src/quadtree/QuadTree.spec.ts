import QuadTree from './QuadTree';
import Vector from '../common/Vector/Vector';
import Shape from '../common/Shape/Shape';
import I_Vector from '../common/Vector/I_Vector';

describe('QuadTree', () => {
    const shape = new Shape([
        new Vector({ x: 0, y: 0 }),
        new Vector({ x: 4, y: 0 }),
        new Vector({ x: 4, y: 4 }),
        new Vector({ x: 0, y: 4 }),
    ]);
    const points: I_Vector[] = [
        new Vector({ x: 1, y: 1 }),
        new Vector({ x: 2, y: 2 }),
        new Vector({ x: 3, y: 3 }),
    ];

    test('initialize QuadTree', () => {
        const quadTree = new QuadTree(shape, points);
        expect(quadTree).toBeInstanceOf(QuadTree);
    });

    test('getLevel returns correct level', () => {
        const quadTree = new QuadTree(shape, points);
        quadTree.forceDivide(1);
        const level1 = quadTree.getLevel(1);
        expect(level1.length).toBe(4);
    });

    test('findChildThatContains returns correct child', () => {
        const quadTree = new QuadTree(shape, points);
        quadTree.forceDivide(1);
        const child = quadTree.findChildThatContains(new Vector({ x: 1, y: 1 }));
        expect(child).toBeInstanceOf(QuadTree);
        expect(child.containedPoints).toEqual([new Vector({ x: 1, y: 1 })]);
    });

    test('forceDivide divides QuadTree correctly', () => {
        const quadTree = new QuadTree(shape, points);
        quadTree.forceDivide(2);
        const level2 = quadTree.getLevel(2);
        expect(level2.length).toBe(16);
    });

    test('divide creates children correctly', () => {
        const quadTree = new QuadTree(shape, points);
        quadTree.divide(points);
        expect(quadTree.children.length).toBe(4);
    });
});
