export default `declare class BoundingBox {
    private readonly points;
    topLeft: Vector;
    topRight: Vector;
    bottomRight: Vector;
    bottomLeft: Vector;
    readonly lines: boundingBoxLines;
    limits: limits;
    constructor(points: Vector[]);
    readonly midpoints: limits;
    readonly area: number;
    readonly width: number;
    readonly height: number;
    growBy(n: number): void;
    clone(): BoundingBox;
    private findCorners;
    private makeLines;
    private findLimits;
}
declare class Clock {
    private startTime;
    private oldTime;
    private elapsedTime;
    private running;
    private readonly timeFunction;
    constructor();
    start(): void;
    stop(): void;
    getDelta(): number;
    getElapsed(): number;
}
declare class Line implements id {
    readonly a: Vector;
    readonly b: Vector;
    id: string;
    constructor(a: Vector, b: Vector);
    readonly length: number;
    readonly midpoint: Vector;
    clone(): Line;
    equals(line: Line): boolean;
    intersects(line: Line): boolean;
    intersectionPoint(line: Line): Vector;
    makeDisjoinedSets(): void;
    static PointsFromArray(lines: Line[]): Vector[];
    static IsUnique(line: Line, lines: Line[]): boolean;
    static RemoveDuplicates(lines: Line[]): Line[];
}
declare class LineIntersection {
    private line1;
    private line2;
    private readonly x1;
    private readonly y1;
    private readonly x2;
    private readonly y2;
    private readonly x3;
    private readonly y3;
    private readonly x4;
    private readonly y4;
    private readonly efghDeterminant;
    constructor(line1: Line, line2: Line);
    readonly intersects: boolean;
    readonly point: Vector;
    private getX;
    private getY;
    private isOnSegments;
}
declare abstract class Matrix {
    rows: number[][];
    columns: number[][];
    protected static AddElements(elementsA: number[], elementsB: number[]): number[];
    protected static MultiplyElementsScalar(elements: number[], scalar: number): number[];
    protected static Multiply(rows: number[][], columns: number[][]): number[];
    private static CrossProduct;
}
declare class Matrix2 extends Matrix {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    constructor(a?: number, b?: number, c?: number, d?: number);
    readonly elements: number[];
    determine(): number;
    add({ elements }: Matrix2): Matrix2;
    multiply(m2: Matrix2): Matrix2;
    multiplyScalar(scalar: number): Matrix2;
}
declare class Matrix3 extends Matrix2 {
    readonly e: number;
    readonly f: number;
    readonly g: number;
    readonly h: number;
    readonly i: number;
    constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number, i?: number);
    readonly elements: number[];
    determine(): number;
    add({ elements }: Matrix3): Matrix3;
    multiply({ columns }: Matrix3): Matrix3;
    multiplyScalar(scalar: number): Matrix3;
}
declare class Matrix4 extends Matrix3 {
    readonly j: number;
    readonly k: number;
    readonly l: number;
    readonly m: number;
    readonly n: number;
    readonly o: number;
    readonly p: number;
    constructor(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number, i?: number, j?: number, k?: number, l?: number, m?: number, n?: number, o?: number, p?: number);
    readonly elements: number[];
    determine(): number;
    add({ elements }: Matrix4): Matrix4;
    multiplyScalar(scalar: number): Matrix4;
    multiply({ columns }: Matrix4): Matrix4;
}
declare class Shape {
    readonly points: Vector[];
    readonly lines: Line[];
    readonly boundingBox: BoundingBox;
    constructor(points: Vector[]);
    containsPoint(point: Vector): boolean;
    readonly centroid: Vector;
    private static makeLines;
}
declare class Triangle implements id {
    readonly a: Vector;
    readonly b: Vector;
    readonly c: Vector;
    id: string;
    readonly lines: triangleLines;
    constructor(a: Vector, b: Vector, c: Vector);
    readonly centroid: Vector;
    readonly points: Vector[];
    readonly linesArray: Line[];
    equals(triangle: Triangle): boolean;
    isPointInCircumcircle(point: Vector): boolean;
    hasPoint(point: Vector): boolean;
    hasAnyPoint(points: Vector[]): boolean;
    static LinesFromArray(triangles: Triangle[]): Line[];
    static GetUniqueLines(triangles: Triangle[]): Line[];
}
declare class Vector {
    set: DisjoinedSet;
    quadTree: QuadTree;
    x: number;
    y: number;
    constructor({ x, y }?: point);
    clone(): Vector;
    magnitude(): number;
    dotProduct({ x, y }: Vector): number;
    add(vector: Vector): Vector;
    sub(vector: Vector): Vector;
    multiplyScalar(scalar: number): Vector;
    normalize(): Vector;
    lerp(vector: Vector, alpha: number): Vector;
    negative(): Vector;
    perpendicular(): {
        left: Vector;
        right: Vector;
    };
    scale(length: number): Vector;
    angleDeg(vector: Vector): number;
    angleRad(vector: Vector): number;
    bisector(vector: Vector): Vector;
    equals(vector: Vector): boolean;
    distanceTo(vector: Vector): number;
    midpoint(vector: Vector): Vector;
    static FindPolyCentroid(points: Vector[]): Vector;
    static ArrangePointsCCW(points: Vector[]): Vector[];
    static UniqueFromArray(points: Vector[]): Vector[];
    private angle;
}
declare const ERROR_PREFIX: string;
declare const MIN_GRID_SIZE_ERROR: string;
declare const DEFAULT_GRID_SIZE: size;
declare const NAVIGATOR_MAX_STEPS: number;
declare const NAVIGATOR_VERTICAL_COST: number;
declare const NAVIGATOR_DIAGONAL_COST: number;
declare const TILE_NEIGHBORS_COUNT: number;
declare const DEFAULT_VECTOR_POSITION: point;
declare class Component implements id, Update {
    readonly id: string;
    name: string;
    updater: Updater;
    entity: Entity;
    updatePriority: number | null;
    start(): void;
    stop(): void;
    update(tickData: tickData): void;
}
declare class Entity implements id {
    id: string;
    name: string;
    updater: Updater;
    readonly components: Component[];
    start(): void;
    stop(): void;
}
declare type componentCallback = (component: Component) => boolean;
declare class EntityUpdater {
    private readonly updater;
    private readonly entities;
    constructor(updater: Updater);
    start(): void;
    stop(): void;
    clear(): void;
    add(entity: Entity): updaterReport[];
    remove({ components }: Entity): updaterReport[];
    toggle({ components }: Entity): updaterReport[];
    private loopComponents;
}
declare class Invoke extends Component {
    readonly updater: Updater;
    readonly component: Component;
    timeout: number;
    id: string;
    originalTimeout: number;
    constructor(updater: Updater, component: Component, timeout: number);
    update(tickData: tickData): void;
    stop(): boolean;
}
declare class InvokeRepeating extends Invoke {
    private times;
    private updated;
    constructor(updater: Updater, component: Component, interval: number, times: number);
    update(tickData: tickData): void;
}
declare class Updater {
    onUpdateComplete: Component;
    private components;
    private running;
    private clock;
    private entityUpdater;
    private frameId;
    start(): boolean;
    stop(): boolean;
    clear(): void;
    add(entity: Entity): updaterReport[];
    add(component: Component): boolean;
    remove(entity: Entity): updaterReport[];
    remove(component: Component): boolean;
    toggle(entity: Entity): updaterReport[];
    toggle(component: Component): boolean;
    isUpdatingComponent(component: Component): boolean;
    addComponent(component: Component): boolean;
    removeComponent(component: Component): boolean;
    toggleComponent(component: Component): boolean;
    invoke(component: Component, time: number): void;
    invokeRepeating(component: Component, time: number, times?: number): void;
    getTickData(): tickData;
    private pushToQueue;
    private update;
}
declare type boundingBox = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
declare type boundingBoxLines = {
    top: Line;
    right: Line;
    bottom: Line;
    left: Line;
};
declare type limits = {
    top: Vector;
    bottom: Vector;
    left: Vector;
    right: Vector;
};
declare type onTileCreate = (tile: NavigatorTile) => void;
interface id {
    id: string;
}
declare type onExplore = (tile: NavigatorTile) => void;
declare type onComplete = (path: NavigatorTile[]) => void;
declare type navigatorSettings = {
    maxSteps?: number;
    grid: Grid;
    begin: NavigatorTile;
    end: NavigatorTile;
    onExplore?: (tile: NavigatorTile) => void;
    onComplete?: (path: NavigatorTile[]) => void;
};
declare type point = {
    x: number;
    y: number;
};
declare type row = NavigatorTile[];
declare type size = {
    width: number;
    height: number;
};
declare type tickData = {
    deltaTime: number;
    deltaTimeMS: number;
    elapsedTime: number;
};
declare type triangleLines = {
    ab: Line;
    bc: Line;
    ca: Line;
};
interface Update extends id {
    update(tickData: tickData): void;
}
interface updaterReport extends id {
    name: string;
    success: boolean;
}
declare class Grid {
    private size;
    readonly obstacles: Obstacles;
    readonly tiles: row;
    readonly rows: row[];
    constructor(size?: size);
    /** Returns a tile at the specified coordinates. */
    getTile({ x, y }: point): NavigatorTile | null;
    /** Returns a random tile, can be an obstacle or not. */
    getRandomTile(): NavigatorTile;
    /** Returns a random non-obstacle tile, if it exists. */
    getRandomFreeTile(): NavigatorTile | null;
    private checkMinimumGridSize;
    private makeGrid;
}
declare class Navigator implements id {
    readonly id: string;
    private verticalCost;
    private diagonalCost;
    private _path;
    private open;
    private closed;
    private registeredTiles;
    private steps;
    private grid;
    private begin;
    private end;
    private onExplore;
    private onComplete;
    private maxSteps;
    constructor({ grid, begin, end, onExplore, onComplete, maxSteps, }: navigatorSettings);
    readonly path: row;
    /** Begin the pathfinding process. Does not start if destination is an obstacle. */
    start(): boolean;
    private deregisterNavigatorData;
    private calculateH;
    private calculateG;
    private done;
    private calculateF;
    static getRowOffset(iteration: number): number;
    static getColOffset(iteration: number): number;
    private getParent;
    private chooseNext;
    private getPath;
    private addToExplored;
}
declare class NavigatorData implements id {
    readonly navigator: Navigator;
    id: string;
    hVal: number;
    gVal: number;
    fVal: number;
    parent: NavigatorTile;
    constructor(navigator: Navigator);
}
declare class NavigatorTile implements id {
    readonly position: Vector;
    id: string;
    isObstacle: boolean;
    private navigators;
    constructor(position: Vector);
    registerNavigatorData(navigator: Navigator): boolean;
    deregisterNavigatorData(navigator: Navigator): boolean;
    getNavigatorData(navigator: Navigator): NavigatorData;
    distanceTo({ position }: NavigatorTile): number;
    equals({ position }: NavigatorTile): boolean;
    isNeighbour({ position }: NavigatorTile): boolean;
    isDiagonal(tile: NavigatorTile): boolean;
    isAdjacent(tile: NavigatorTile): boolean;
}
declare class Obstacles {
    private readonly openList;
    private readonly closedList;
    constructor({ tiles }: Grid);
    readonly list: NavigatorTile[];
    add(tile: NavigatorTile): boolean;
    remove(tile: NavigatorTile): boolean;
    addRandom(count?: number): NavigatorTile | row | null;
    removeRandom(count?: number): NavigatorTile | row | null;
    getRandomOpen(): NavigatorTile | null;
    private getRandom;
    private manipulateMultipleRandom;
    private manipulateSingleRandom;
    private manipulate;
}
declare class QuadTree {
    shape: Shape;
    private points;
    level: number;
    parent: QuadTree;
    readonly children: QuadTree[];
    readonly containedPoints: Vector[];
    private capacity;
    constructor(shape: Shape, points: Vector[], level?: number);
    private start;
    getLevel(level: number): QuadTree[] | null;
    findChildThatContains(point: Vector): QuadTree;
    forceDivide(times: number): void;
    divide(points: Vector[]): void;
}
declare class DisjoinedSet implements id {
    id: string;
    readonly points: Vector[];
    constructor(point: Vector);
    equals({ id }: DisjoinedSet): boolean;
    merge({ points }: DisjoinedSet): DisjoinedSet;
}
declare class Hull {
    readonly lines: Line[];
    private _points;
    private readonly triangles;
    constructor({ triangles }: Triangulation);
    readonly points: Vector[];
    start(): void;
}
declare class MinimumSpanningTree {
    readonly lines: Line[];
    private _nonMinSpanLines;
    private uniqueLines;
    private readonly triangulationLines;
    constructor({ lines }: Triangulation);
    readonly nonMinSpanLines: Line[];
    start(): void;
    private getLines;
}
declare class Triangulation {
    readonly points: Vector[];
    readonly lines: Line[];
    readonly triangles: Triangle[];
    readonly MST: MinimumSpanningTree;
    readonly hull: Hull;
    private holderTriangle;
    constructor(points: Vector[]);
    private triangulate;
    private static MakeHolderTriangle;
    private cleanHolderTriangle;
    private addFinishedTriangulationLines;
}
declare const cloneObject: (object: any) => any;
declare const cloneObjectArray: (array: any) => any;
declare const contains: (array: id[], element: id) => boolean;
declare const findIndex: (array: id[], find: id) => number;
declare const removeFromArray: (array: id[], find: id) => boolean;
declare const removeFromArrayAtIndex: (array: id[], index: number) => boolean;
declare const isOdd: (n: number) => boolean;
declare const isEven: (n: number) => boolean;
declare const isNumeric: (n: number) => boolean;
declare const RadToDeg: (rad: number) => number;
declare const DegToRad: (deg: number) => number;
declare const randomInt: (min: number, max: number) => number;
declare const randomFloat: (min: number, max: number) => number;
declare const randomColor: () => string;
declare const randomPoint: ({ topLeft, topRight, bottomLeft, }: BoundingBox) => Vector;
declare const randomPoints: (count: number, box: BoundingBox) => Vector[];
declare const sort: (array: any[], prop: string) => any[];
declare const immutableObjectSort: (array: any[], prop: string) => any[];
declare const floatPrecision: number;
declare const toFloat: (number: number) => number;
declare const chr4: () => string;
declare const uniqueId: () => string;
declare const XOR: (a: boolean, b: boolean) => boolean;
`