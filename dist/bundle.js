/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/Canvas.ts":
/*!*******************************!*\
  !*** ./src/classes/Canvas.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Canvas; });
/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ "./src/classes/Tile.ts");

class Canvas {
    constructor(selector, size) {
        this.size = size;
        this.rows = [];
        this._canvas = document.querySelector(selector);
        this.context = this._canvas.getContext('2d');
        this.setSize(size);
    }
    get canvas() {
        return this._canvas;
    }
    drawGrid(gridSize, tileSize) {
        this.boundingBox = this.getBoundingBox(gridSize, tileSize);
        for (let y = 0; y < gridSize.height; y++) {
            const row = [];
            for (let x = 0; x < gridSize.width; x++) {
                const coords = { x, y };
                const position = this.getTilePosition(coords, tileSize);
                const tile = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](tileSize, position, coords, this.context);
                row.push(tile);
            }
            this.rows.push(row);
        }
    }
    getTile({ x, y }) {
        const row = this.rows[y];
        if (!row) {
            return null;
        }
        else if (row.length < x) {
            return null;
        }
        return row[x];
    }
    setSize({ width, height }) {
        this._canvas.width = width;
        this._canvas.height = height;
    }
    getTilePosition(coords, size) {
        const offset = {
            x: coords.x * size.width,
            y: coords.y * size.height,
        };
        return {
            x: this.boundingBox.left + offset.x,
            y: this.boundingBox.top + offset.y,
        };
    }
    getBoundingBox(gridSize, tileSize) {
        const center = {
            x: Math.round(this.canvas.width / 2),
            y: Math.round(this.canvas.height / 2),
        };
        const { width, height } = Canvas.getGridSizeInPixels(gridSize, tileSize);
        const halfHeight = Math.round(height / 2);
        const halfWidth = Math.round(width / 2);
        return {
            top: center.y - halfHeight,
            bottom: center.y + halfHeight,
            left: center.x - halfWidth,
            right: center.x + halfWidth,
        };
    }
    static getGridSizeInPixels(gridSize, tileSize) {
        return {
            width: gridSize.width * tileSize.width,
            height: gridSize.height * tileSize.height,
        };
    }
}


/***/ }),

/***/ "./src/classes/Click.ts":
/*!******************************!*\
  !*** ./src/classes/Click.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Click; });
class Click {
    constructor(canvas, grid) {
        this.canvas = canvas;
        this.grid = grid;
        this.addEvent();
    }
    addEvent() {
        this.canvas.addEventListener('click', this.onClick.bind(this), false);
        this.canvas.addEventListener('contextmenu', this.onClick.bind(this), false);
    }
    onClick(event) {
        event.preventDefault();
        const clickedTile = null; //this.grid.findTileByPixelCoords(event);
        if (clickedTile) {
            switch (event.button) {
                case 0:
                    //this.grid.setStart(clickedTile.navigatorTile);
                    break;
                case 2:
                    //this.grid.setStart(clickedTile.navigatorTile);
                    break;
            }
        }
        return false;
    }
}


/***/ }),

/***/ "./src/classes/Grid.ts":
/*!*****************************!*\
  !*** ./src/classes/Grid.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Grid; });
/* harmony import */ var _NavigatorTile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavigatorTile */ "./src/classes/NavigatorTile.ts");
/* harmony import */ var _util_random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/random */ "./src/util/random.ts");
/* harmony import */ var _Obstacles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Obstacles */ "./src/classes/Obstacles.ts");



class Grid {
    constructor(size) {
        this.size = size;
        this.tiles = [];
        this.rows = [];
        this.obstacles = new _Obstacles__WEBPACK_IMPORTED_MODULE_2__["default"](this);
        this.makeGrid();
    }
    randomTile() {
        const x = Object(_util_random__WEBPACK_IMPORTED_MODULE_1__["int"])(0, this.size.width - 1);
        const y = Object(_util_random__WEBPACK_IMPORTED_MODULE_1__["int"])(0, this.size.height - 1);
        return this.findTile({ x, y });
    }
    randomFreeTile() {
        return this.obstacles.getRandomOpen();
    }
    findTile(position) {
        return Grid.getTile(position, this.rows);
    }
    static getTile({ x, y }, list) {
        const row = list[y];
        return (row && row.length > x) ? row[x] : null;
    }
    makeGrid() {
        for (let y = 0; y < this.size.height; y++) {
            const row = [];
            for (let x = 0; x < this.size.width; x++) {
                const tile = new _NavigatorTile__WEBPACK_IMPORTED_MODULE_0__["default"]({ x, y });
                this.tiles.push(tile);
                row.push(tile);
            }
            this.rows.push(row);
        }
    }
}


/***/ }),

/***/ "./src/classes/Navigator.ts":
/*!**********************************!*\
  !*** ./src/classes/Navigator.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigator; });
/* harmony import */ var _util_uniqueID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/uniqueID */ "./src/util/uniqueID.ts");
/* harmony import */ var _util_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/id */ "./src/util/id.ts");


class Navigator {
    constructor(grid, begin, end, onExplore = () => { }, onComplete = Navigator.defaultOnComplete) {
        this.grid = grid;
        this.begin = begin;
        this.end = end;
        this.onExplore = onExplore;
        this.onComplete = onComplete;
        this.id = Object(_util_uniqueID__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.verticalCost = 1;
        this.diagonalCost = 1.4;
        this.neighborsCount = 9;
        this.tiles = [];
        this.open = [];
        this.closed = [];
    }
    start() {
        this.addOpenTiles(this.grid);
        this.calculateH();
        this.closed.push(this.begin);
        const beginNavData = this.begin.getNavigatorData(this);
        beginNavData.gVal = 0;
        this.calculateG(this.begin);
    }
    addOpenTiles(grid) {
        grid.rows.forEach((row) => {
            const navigatorTiles = row.map((tile) => {
                tile.registerNavigatorData(this);
                return tile;
            });
            this.tiles = this.tiles.concat(navigatorTiles);
        });
    }
    calculateH() {
        this.tiles.forEach((tile) => {
            // manhattan distance
            const navData = tile.getNavigatorData(this);
            const colVal = Math.abs(tile.position.x - this.end.position.x);
            const rowVal = Math.abs(tile.position.y - this.end.position.y);
            navData.hVal = colVal + rowVal;
        });
    }
    calculateG(tile) {
        this.current = tile;
        const tileNavData = tile.getNavigatorData(this);
        for (let i = 0; i < this.neighborsCount; i++) {
            const x = tile.position.x + Navigator.getColOffset(i);
            const y = tile.position.y + this.getRowOffset(i);
            const exploring = this.grid.findTile({ x, y });
            if (!exploring) {
                continue;
            }
            const exploringNavData = exploring.getNavigatorData(this);
            if (exploring.isObstacle) {
                continue;
            }
            if (Object(_util_id__WEBPACK_IMPORTED_MODULE_1__["contains"])(this.closed, exploring)) {
                continue;
            }
            if (tile.id === exploring.id) {
                this.closed.push(exploring);
            }
            else {
                if (!this.getParent(tile, exploring)) {
                    continue;
                }
                if (!Object(_util_id__WEBPACK_IMPORTED_MODULE_1__["contains"])(this.open, exploring)) {
                    this.open.push(exploring);
                }
                if (Navigator.isDiagonal(tile, exploring)) {
                    exploringNavData.gVal = tileNavData.gVal + this.diagonalCost;
                }
                else {
                    exploringNavData.gVal = tileNavData.gVal + this.verticalCost;
                }
            }
            exploringNavData.fVal = this.calculateF(exploring);
        }
        const next = this.chooseNext();
        if (next) {
            setTimeout(() => {
                this.onExplore(next);
                this.calculateG(next);
            }, 10);
            /*
            this.onExplore(next);
            this.calculateG(next);
            */
        }
        else {
            const path = this.getPath();
            this.onComplete(path);
        }
    }
    calculateF(tile) {
        const { gVal, hVal } = tile.getNavigatorData(this);
        return gVal + hVal;
    }
    getRowOffset(iteration) {
        /*
           iteration = 0, 1, or 2: [-1][-1][-1]
           iteration = 3, 4, or 5: [ 0][ 0][ 0]
           iteration = 6, 7, or 8: [+1][+1][+1]
         */
        return this.neighborsCount + -Math.floor((32 - iteration) / 3);
    }
    static getColOffset(iteration) {
        /*
           iteration = 0, 1, or 2: [-1][ 0][+1]
           iteration = 3, 4, or 5: [-1][ 0][+1]
           iteration = 6, 7, or 8: [-1][ 0][+1]
         */
        return iteration % 3 - 1;
    }
    static isDiagonal(tile, checkTile) {
        return (tile.position.x !== checkTile.position.x &&
            tile.position.y !== checkTile.position.y);
    }
    getParent(tile, checkTile) {
        const tileNavData = tile.getNavigatorData(this);
        const checkNavData = checkTile.getNavigatorData(this);
        if (!checkNavData.parent) {
            checkNavData.parent = tile;
            return tile;
        }
        const moveCost = Navigator.isDiagonal(tile, checkTile)
            ? this.diagonalCost
            : this.verticalCost;
        if (tileNavData.gVal + moveCost < checkNavData.gVal) {
            checkNavData.parent = tile;
            return tile;
        }
        return null;
    }
    chooseNext() {
        this.open = this.open.sort((a, b) => {
            const aNavData = a.getNavigatorData(this);
            const bNavData = b.getNavigatorData(this);
            return aNavData.fVal - bNavData.fVal;
        });
        const next = this.open[0];
        if (!next) {
            return null;
        }
        this.open.shift();
        this.closed.push(next);
        if (next.id === this.end.id) {
            this.current = this.end;
            return null;
        }
        return next;
    }
    getPath() {
        const path = [];
        let { current } = this;
        while (current.id !== this.begin.id) {
            const currentNavData = current.getNavigatorData(this);
            path.push(current);
            if (currentNavData.parent) {
                current = currentNavData.parent;
            }
            else {
                break;
            }
        }
        path.reverse();
        return path;
    }
    static defaultOnComplete(path) {
        console.log(path);
    }
}


/***/ }),

/***/ "./src/classes/NavigatorData.ts":
/*!**************************************!*\
  !*** ./src/classes/NavigatorData.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavigatorData; });
/* harmony import */ var _util_uniqueID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/uniqueID */ "./src/util/uniqueID.ts");

class NavigatorData {
    constructor(navigator) {
        this.navigator = navigator;
        this.id = Object(_util_uniqueID__WEBPACK_IMPORTED_MODULE_0__["default"])();
    }
}


/***/ }),

/***/ "./src/classes/NavigatorTile.ts":
/*!**************************************!*\
  !*** ./src/classes/NavigatorTile.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavigatorTile; });
/* harmony import */ var _util_uniqueID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/uniqueID */ "./src/util/uniqueID.ts");
/* harmony import */ var _util_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/id */ "./src/util/id.ts");
/* harmony import */ var _NavigatorData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavigatorData */ "./src/classes/NavigatorData.ts");



class NavigatorTile {
    constructor(position) {
        this.position = position;
        this.id = Object(_util_uniqueID__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.isObstacle = false;
        this.navigators = [];
    }
    registerNavigatorData(navigator) {
        const navigationData = new _NavigatorData__WEBPACK_IMPORTED_MODULE_2__["default"](navigator);
        if (Object(_util_id__WEBPACK_IMPORTED_MODULE_1__["contains"])(this.navigators, navigationData)) {
            return false;
        }
        this.navigators.push(navigationData);
        return true;
    }
    getNavigatorData(navigator) {
        const navData = this.navigators.find((navigationData) => {
            return navigationData.navigator.id === navigator.id;
        });
        return navData ? navData : null;
    }
}


/***/ }),

/***/ "./src/classes/Obstacles.ts":
/*!**********************************!*\
  !*** ./src/classes/Obstacles.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Obstacles; });
/* harmony import */ var _util_random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/random */ "./src/util/random.ts");
/* harmony import */ var _util_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/id */ "./src/util/id.ts");


class Obstacles {
    constructor(grid) {
        this.grid = grid;
        this.openList = [];
        this.closedList = [];
        this.openList = grid.tiles;
    }
    get list() {
        return this.closedList;
    }
    add(tile) {
        return this.manipulate(true, tile);
    }
    remove(tile) {
        return this.manipulate(false, tile);
    }
    addRandom(count = 1) {
        return this.manipulateMultipleRandom(true, count);
    }
    removeRandom(count = 1) {
        return this.manipulateMultipleRandom(false, count);
    }
    getRandomOpen() {
        return this.getRandom(true);
    }
    getRandom(open) {
        const list = open ? this.openList : this.closedList;
        const random = Object(_util_random__WEBPACK_IMPORTED_MODULE_0__["int"])(0, list.length - 1);
        const tile = list[random];
        return tile ? tile : null;
    }
    manipulateMultipleRandom(add, count) {
        const tiles = [];
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                const tile = this.manipulateSingleRandom(add);
                tiles.push(tile);
            }
            return count === 1 ? tiles[0] : tiles;
        }
        return null;
    }
    manipulateSingleRandom(add) {
        const tile = this.getRandom(add);
        if (tile) {
            this.manipulate(add, tile);
            return tile;
        }
        return null;
    }
    manipulate(add, tile) {
        const isInvalid = add ? tile.isObstacle : !tile.isObstacle;
        if (isInvalid) {
            return;
        }
        let list;
        let otherList;
        if (add) {
            list = this.openList;
            otherList = this.closedList;
        }
        else {
            list = this.closedList;
            otherList = this.openList;
        }
        if (Object(_util_id__WEBPACK_IMPORTED_MODULE_1__["contains"])(list, tile)) {
            tile.isObstacle = add;
            const index = Object(_util_id__WEBPACK_IMPORTED_MODULE_1__["findIndex"])(list, tile);
            list.splice(index, 1);
            otherList.push(tile);
            return true;
        }
        return false;
    }
}


/***/ }),

/***/ "./src/classes/Tile.ts":
/*!*****************************!*\
  !*** ./src/classes/Tile.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tile; });
/* harmony import */ var _util_uniqueID__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/uniqueID */ "./src/util/uniqueID.ts");
/* harmony import */ var _classes_NavigatorTile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/NavigatorTile */ "./src/classes/NavigatorTile.ts");
/* harmony import */ var _const_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const/colors */ "./src/const/colors.ts");



class Tile {
    constructor(size, position, _gridCoords, context) {
        this.size = size;
        this.position = position;
        this._gridCoords = _gridCoords;
        this.context = context;
        this.id = Object(_util_uniqueID__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.navigatorTile = null;
        this._isObstacle = false;
        this._isStart = false;
        this.navigatorTile = new _classes_NavigatorTile__WEBPACK_IMPORTED_MODULE_1__["default"](_gridCoords);
        this.stroke(_const_colors__WEBPACK_IMPORTED_MODULE_2__["outline"]);
    }
    get isObstacle() {
        return this._isObstacle;
    }
    get isStart() {
        return this._isStart;
    }
    get canBeStart() {
        return !this.isObstacle && !this.isStart;
    }
    get gridCoords() {
        return this._gridCoords;
    }
    becomeStart() {
        if (!this.canBeStart) {
            return false;
        }
        this.fill(_const_colors__WEBPACK_IMPORTED_MODULE_2__["start"]);
        this.stroke(_const_colors__WEBPACK_IMPORTED_MODULE_2__["outline"]);
        return true;
    }
    reset() {
        this._isStart = false;
        this.fill(_const_colors__WEBPACK_IMPORTED_MODULE_2__["empty"]);
        this.stroke(_const_colors__WEBPACK_IMPORTED_MODULE_2__["outline"]);
    }
    becomeObstacle() {
        this._isObstacle = true;
        this.fill(_const_colors__WEBPACK_IMPORTED_MODULE_2__["obstacle"]);
    }
    containsPoint({ x, y }) {
        return (x >= this.position.x &&
            x <= this.position.x + this.size.width &&
            y >= this.position.y &&
            y <= this.position.y + this.size.height);
    }
    fill(color) {
        this.draw(() => {
            this.context.fillStyle = color;
            this.context.fill();
        });
    }
    stroke(color = 'black') {
        this.draw(() => {
            this.context.strokeStyle = color;
            this.context.lineWidth = 1;
            this.context.stroke();
        });
    }
    draw(drawAction) {
        const { x, y } = this.position;
        const { width, height } = this.size;
        this.context.beginPath();
        //this.context.arc(x, y , width, 0, 2*Math.PI);
        this.context.rect(x, y, width, height);
        drawAction();
        this.context.closePath();
    }
}


/***/ }),

/***/ "./src/const/colors.ts":
/*!*****************************!*\
  !*** ./src/const/colors.ts ***!
  \*****************************/
/*! exports provided: start, obstacle, outline, empty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "obstacle", function() { return obstacle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outline", function() { return outline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
const start = 'red';
const obstacle = 'black';
const outline = 'black';
const empty = 'white';



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Canvas */ "./src/classes/Canvas.ts");
/* harmony import */ var _classes_Grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Grid */ "./src/classes/Grid.ts");
/* harmony import */ var _classes_Click__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Click */ "./src/classes/Click.ts");
/* harmony import */ var _classes_Navigator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/Navigator */ "./src/classes/Navigator.ts");




// import { color } from "./util/random";
const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
};
const canvas = new _classes_Canvas__WEBPACK_IMPORTED_MODULE_0__["default"]('#canvas', canvasSize);
const gridSize = { width: 100, height: 75 };
const tileSize = { width: 10, height: 10 };
const grid = new _classes_Grid__WEBPACK_IMPORTED_MODULE_1__["default"](gridSize);
new _classes_Click__WEBPACK_IMPORTED_MODULE_2__["default"](canvas.canvas, grid);
canvas.drawGrid(gridSize, tileSize);
const onNavExplore = ({ position }) => {
    const tile = canvas.getTile(position);
    tile.fill('blue');
    tile.stroke();
};
const onNavComplete = (path) => {
    path.forEach(({ position }) => {
        const tile = canvas.getTile(position);
        tile.fill('green');
        tile.stroke();
    });
};
grid.obstacles.addRandom(3000);
grid.obstacles.list.forEach(({ position }) => {
    const tile = canvas.getTile(position);
    tile.fill('black');
    tile.stroke();
});
for (let i = 0; i < 20; i++) {
    const navBegin = grid.randomFreeTile();
    const navEnd = grid.randomFreeTile();
    const navigator = new _classes_Navigator__WEBPACK_IMPORTED_MODULE_3__["default"](grid, navBegin, navEnd, onNavExplore, onNavComplete);
    navigator.start();
}


/***/ }),

/***/ "./src/util/id.ts":
/*!************************!*\
  !*** ./src/util/id.ts ***!
  \************************/
/*! exports provided: contains, findIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
const contains = (array, element) => {
    return findIndex(array, element) !== -1;
};
const findIndex = (array, find) => {
    return array.findIndex((element) => element.id === find.id);
};



/***/ }),

/***/ "./src/util/random.ts":
/*!****************************!*\
  !*** ./src/util/random.ts ***!
  \****************************/
/*! exports provided: int, float, color */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "int", function() { return int; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "float", function() { return float; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
const int = (min, max) => {
    return Math.round(float(min, max));
};
const float = (min, max) => {
    return Math.random() * (max - min) + min;
};
const color = () => {
    const r = int(0, 255);
    const g = 0; //int(0, 255);
    const b = 0; //int(0, 255);
    return `rgb(${r},${g},${b})`;
};



/***/ }),

/***/ "./src/util/uniqueID.ts":
/*!******************************!*\
  !*** ./src/util/uniqueID.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let id = 0;
const uniqueId = () => id++;
/* harmony default export */ __webpack_exports__["default"] = (uniqueId);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvQ2FudmFzLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL0NsaWNrLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL0dyaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTmF2aWdhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL05hdmlnYXRvckRhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTmF2aWdhdG9yVGlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9PYnN0YWNsZXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvVGlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3QvY29sb3JzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9yYW5kb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdW5pcXVlSUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFD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SUFDbEQsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBVyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUM7QUFFNkI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWL0I7QUFBQSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQVUsRUFBRTtJQUMvQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBVSxFQUFFO0lBQ2pELE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMzQyxDQUFDLENBQUM7QUFFRixNQUFNLEtBQUssR0FBRSxHQUFHLEVBQUU7SUFDaEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBYztJQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBYztJQUMxQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFFMkI7Ozs7Ozs7Ozs7Ozs7QUNmN0I7QUFBQSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFWCxNQUFNLFFBQVEsR0FBRyxHQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUVwQywrREFBZSxRQUFRLEVBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgc2l6ZSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpemUnO1xuaW1wb3J0IFRpbGUgZnJvbSAnLi9UaWxlJztcbmltcG9ydCBwb2ludCBmcm9tICcuLi9pbnRlcmZhY2VzL3BvaW50JztcbmltcG9ydCBOYXZpZ2F0b3JUaWxlIGZyb20gJy4vTmF2aWdhdG9yVGlsZSc7XG5cbnR5cGUgcm93ID0gVGlsZVtdO1xudHlwZSBib3VuZGluZ0JveCA9IHsgdG9wOiBudW1iZXI7IGJvdHRvbTogbnVtYmVyOyBsZWZ0OiBudW1iZXI7IHJpZ2h0OiBudW1iZXIgfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSByZWFkb25seSBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgYm91bmRpbmdCb3g6IGJvdW5kaW5nQm94O1xuICBwcml2YXRlIHJvd3M6IHJvd1tdID0gW107XG5cbiAgY29uc3RydWN0b3Ioc2VsZWN0b3I6IHN0cmluZywgcHJpdmF0ZSBzaXplOiBzaXplKSB7XG4gICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5zZXRTaXplKHNpemUpO1xuICB9XG5cbiAgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgfVxuXG4gIGRyYXdHcmlkKGdyaWRTaXplOiBzaXplLCB0aWxlU2l6ZTogc2l6ZSk6IHZvaWQge1xuICAgIHRoaXMuYm91bmRpbmdCb3ggPSB0aGlzLmdldEJvdW5kaW5nQm94KGdyaWRTaXplLCB0aWxlU2l6ZSk7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGdyaWRTaXplLmhlaWdodDsgeSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ3JpZFNpemUud2lkdGg7IHgrKykge1xuICAgICAgICBjb25zdCBjb29yZHM6IHBvaW50ID0geyB4LCB5IH07XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uOiBwb2ludCA9IHRoaXMuZ2V0VGlsZVBvc2l0aW9uKGNvb3JkcywgdGlsZVNpemUpO1xuICAgICAgICBjb25zdCB0aWxlID0gbmV3IFRpbGUodGlsZVNpemUsIHBvc2l0aW9uLCBjb29yZHMsIHRoaXMuY29udGV4dCk7XG4gICAgICAgIHJvdy5wdXNoKHRpbGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5yb3dzLnB1c2gocm93KTtcbiAgICB9XG4gIH1cblxuICBnZXRUaWxlKHsgeCwgeSB9OiBwb2ludCk6IFRpbGUgfCBudWxsIHtcbiAgICBjb25zdCByb3c6IHJvdyA9IHRoaXMucm93c1t5XTtcblxuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKHJvdy5sZW5ndGggPCB4KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93W3hdO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRTaXplKHsgd2lkdGgsIGhlaWdodCB9OiBzaXplKTogdm9pZCB7XG4gICAgdGhpcy5fY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGlsZVBvc2l0aW9uKGNvb3JkczogcG9pbnQsIHNpemU6IHNpemUpOiBwb2ludCB7XG4gICAgY29uc3Qgb2Zmc2V0ID0ge1xuICAgICAgeDogY29vcmRzLnggKiBzaXplLndpZHRoLFxuICAgICAgeTogY29vcmRzLnkgKiBzaXplLmhlaWdodCxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHRoaXMuYm91bmRpbmdCb3gubGVmdCArIG9mZnNldC54LFxuICAgICAgeTogdGhpcy5ib3VuZGluZ0JveC50b3AgKyBvZmZzZXQueSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCb3VuZGluZ0JveChncmlkU2l6ZTogc2l6ZSwgdGlsZVNpemU6IHNpemUpOiBib3VuZGluZ0JveCB7XG4gICAgY29uc3QgY2VudGVyOiBwb2ludCA9IHtcbiAgICAgIHg6IE1hdGgucm91bmQodGhpcy5jYW52YXMud2lkdGggLyAyKSxcbiAgICAgIHk6IE1hdGgucm91bmQodGhpcy5jYW52YXMuaGVpZ2h0IC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gQ2FudmFzLmdldEdyaWRTaXplSW5QaXhlbHMoZ3JpZFNpemUsIHRpbGVTaXplKTtcbiAgICBjb25zdCBoYWxmSGVpZ2h0OiBudW1iZXIgPSBNYXRoLnJvdW5kKGhlaWdodCAvIDIpO1xuICAgIGNvbnN0IGhhbGZXaWR0aDogbnVtYmVyID0gTWF0aC5yb3VuZCh3aWR0aCAvIDIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogY2VudGVyLnkgLSBoYWxmSGVpZ2h0LFxuICAgICAgYm90dG9tOiBjZW50ZXIueSArIGhhbGZIZWlnaHQsXG4gICAgICBsZWZ0OiBjZW50ZXIueCAtIGhhbGZXaWR0aCxcbiAgICAgIHJpZ2h0OiBjZW50ZXIueCArIGhhbGZXaWR0aCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0R3JpZFNpemVJblBpeGVscyhncmlkU2l6ZTogc2l6ZSwgdGlsZVNpemU6IHNpemUpOiBzaXplIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IGdyaWRTaXplLndpZHRoICogdGlsZVNpemUud2lkdGgsXG4gICAgICBoZWlnaHQ6IGdyaWRTaXplLmhlaWdodCAqIHRpbGVTaXplLmhlaWdodCxcbiAgICB9O1xuICB9XG5cbiAgLypcblxuXG4gIGZpbmRUaWxlQnlQaXhlbENvb3JkcyhwaXhlbENvb3JkczogcG9pbnQpOiBUaWxlIHwgbnVsbCB7XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLl9yb3dzLmxlbmd0aDsgcisrKSB7XG4gICAgICBjb25zdCByb3c6IHJvdyA9IHRoaXMuX3Jvd3Nbcl07XG5cbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgcm93Lmxlbmd0aDsgYysrKSB7XG4gICAgICAgIGNvbnN0IHRpbGU6IFRpbGUgPSByb3dbY107XG4gICAgICAgIGlmICh0aWxlLmNvbnRhaW5zUG9pbnQocGl4ZWxDb29yZHMpKSB7XG4gICAgICAgICAgcmV0dXJuIHRpbGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAgKi9cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gJy4vR3JpZCc7XG5pbXBvcnQgVGlsZSBmcm9tICcuL1RpbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGljayB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgcHJpdmF0ZSBncmlkOiBHcmlkKSB7XG4gICAgdGhpcy5hZGRFdmVudCgpO1xuICB9XG5cbiAgYWRkRXZlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5vbkNsaWNrLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgfVxuXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiBib29sZWFuIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGNsaWNrZWRUaWxlOiBUaWxlIHwgbnVsbCA9IG51bGw7IC8vdGhpcy5ncmlkLmZpbmRUaWxlQnlQaXhlbENvb3JkcyhldmVudCk7XG5cbiAgICBpZiAoY2xpY2tlZFRpbGUpIHtcbiAgICAgIHN3aXRjaCAoZXZlbnQuYnV0dG9uKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAvL3RoaXMuZ3JpZC5zZXRTdGFydChjbGlja2VkVGlsZS5uYXZpZ2F0b3JUaWxlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIC8vdGhpcy5ncmlkLnNldFN0YXJ0KGNsaWNrZWRUaWxlLm5hdmlnYXRvclRpbGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9OYXZpZ2F0b3JUaWxlJztcbmltcG9ydCBzaXplIGZyb20gJy4uL2ludGVyZmFjZXMvc2l6ZSc7XG5pbXBvcnQgcG9pbnQgZnJvbSAnLi4vaW50ZXJmYWNlcy9wb2ludCc7XG5pbXBvcnQgcm93IGZyb20gJy4uL2ludGVyZmFjZXMvcm93JztcbmltcG9ydCB7IGludCB9IGZyb20gJy4uL3V0aWwvcmFuZG9tJztcbmltcG9ydCBPYnN0YWNsZXMgZnJvbSAnLi9PYnN0YWNsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIHtcbiAgcmVhZG9ubHkgdGlsZXM6IE5hdmlnYXRvclRpbGVbXSA9IFtdO1xuICByZWFkb25seSByb3dzOiByb3dbXSA9IFtdO1xuICBwdWJsaWMgcmVhZG9ubHkgb2JzdGFjbGVzOiBPYnN0YWNsZXMgPSBuZXcgT2JzdGFjbGVzKHRoaXMpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2l6ZTogc2l6ZSkge1xuICAgIHRoaXMubWFrZUdyaWQoKTtcbiAgfVxuXG4gIHJhbmRvbVRpbGUoKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIGNvbnN0IHggPSBpbnQoMCwgdGhpcy5zaXplLndpZHRoIC0gMSk7XG4gICAgY29uc3QgeSA9IGludCgwLCB0aGlzLnNpemUuaGVpZ2h0IC0gMSk7XG5cbiAgICByZXR1cm4gdGhpcy5maW5kVGlsZSh7IHgsIHkgfSk7XG4gIH1cblxuICByYW5kb21GcmVlVGlsZSgpOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMub2JzdGFjbGVzLmdldFJhbmRvbU9wZW4oKTtcbiAgfVxuXG4gIGZpbmRUaWxlKHBvc2l0aW9uOiBwb2ludCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICByZXR1cm4gR3JpZC5nZXRUaWxlKHBvc2l0aW9uLCB0aGlzLnJvd3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0VGlsZSh7IHgsIHkgfTogcG9pbnQsIGxpc3Q6IHJvd1tdKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIGNvbnN0IHJvdzogcm93ID0gbGlzdFt5XTtcbiAgICByZXR1cm4gKHJvdyAmJiByb3cubGVuZ3RoID4geCkgPyByb3dbeF0gOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlR3JpZCgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuc2l6ZS5oZWlnaHQ7IHkrKykge1xuICAgICAgY29uc3Qgcm93OiByb3cgPSBbXTtcblxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnNpemUud2lkdGg7IHgrKykge1xuICAgICAgICBjb25zdCB0aWxlOiBOYXZpZ2F0b3JUaWxlID0gbmV3IE5hdmlnYXRvclRpbGUoeyB4LCB5IH0pO1xuICAgICAgICB0aGlzLnRpbGVzLnB1c2godGlsZSk7XG4gICAgICAgIHJvdy5wdXNoKHRpbGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJvd3MucHVzaChyb3cpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9OYXZpZ2F0b3JUaWxlJztcbmltcG9ydCBOYXZpZ2F0b3JEYXRhIGZyb20gJy4vTmF2aWdhdG9yRGF0YSc7XG5pbXBvcnQgcm93IGZyb20gJy4uL2ludGVyZmFjZXMvcm93JztcbmltcG9ydCBHcmlkIGZyb20gJy4vR3JpZCc7XG5pbXBvcnQgdW5pcXVlSUQgZnJvbSAnLi4vdXRpbC91bmlxdWVJRCc7XG5pbXBvcnQgaWQgZnJvbSAnLi4vaW50ZXJmYWNlcy9pZCc7XG5pbXBvcnQgeyBjb250YWlucyB9IGZyb20gJy4uL3V0aWwvaWQnO1xudHlwZSBvbkV4cGxvcmUgPSAodGlsZTogTmF2aWdhdG9yVGlsZSkgPT4gdm9pZDtcbnR5cGUgb25Db21wbGV0ZSA9IChwYXRoOiBOYXZpZ2F0b3JUaWxlW10pID0+IHZvaWQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRvciBpbXBsZW1lbnRzIGlkIHtcbiAgaWQ6IG51bWJlciA9IHVuaXF1ZUlEKCk7XG4gIHByaXZhdGUgdmVydGljYWxDb3N0OiBudW1iZXIgPSAxO1xuICBwcml2YXRlIGRpYWdvbmFsQ29zdDogbnVtYmVyID0gMS40O1xuICBwcml2YXRlIG5laWdoYm9yc0NvdW50OiBudW1iZXIgPSA5O1xuICBwcml2YXRlIHRpbGVzOiByb3cgPSBbXTtcbiAgcHJpdmF0ZSBvcGVuOiByb3cgPSBbXTtcbiAgcHJpdmF0ZSBjbG9zZWQ6IHJvdyA9IFtdO1xuICBwcml2YXRlIGN1cnJlbnQ6IE5hdmlnYXRvclRpbGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBncmlkOiBHcmlkLFxuICAgIHByaXZhdGUgYmVnaW46IE5hdmlnYXRvclRpbGUsXG4gICAgcHJpdmF0ZSBlbmQ6IE5hdmlnYXRvclRpbGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkV4cGxvcmU6IG9uRXhwbG9yZSA9ICgpID0+IHt9LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgb25Db21wbGV0ZTogb25Db21wbGV0ZSA9IE5hdmlnYXRvci5kZWZhdWx0T25Db21wbGV0ZVxuICApIHt9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRPcGVuVGlsZXModGhpcy5ncmlkKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUgoKTtcbiAgICB0aGlzLmNsb3NlZC5wdXNoKHRoaXMuYmVnaW4pO1xuICAgIGNvbnN0IGJlZ2luTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IHRoaXMuYmVnaW4uZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICBiZWdpbk5hdkRhdGEuZ1ZhbCA9IDA7XG4gICAgdGhpcy5jYWxjdWxhdGVHKHRoaXMuYmVnaW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRPcGVuVGlsZXMoZ3JpZDogR3JpZCk6IHZvaWQge1xuICAgIGdyaWQucm93cy5mb3JFYWNoKChyb3c6IHJvdykgPT4ge1xuICAgICAgY29uc3QgbmF2aWdhdG9yVGlsZXM6IE5hdmlnYXRvclRpbGVbXSA9IHJvdy5tYXAoKHRpbGU6IE5hdmlnYXRvclRpbGUpID0+IHtcbiAgICAgICAgdGlsZS5yZWdpc3Rlck5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgICAgIHJldHVybiB0aWxlO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnRpbGVzID0gdGhpcy50aWxlcy5jb25jYXQobmF2aWdhdG9yVGlsZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVIKCk6IHZvaWQge1xuICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZTogTmF2aWdhdG9yVGlsZSkgPT4ge1xuICAgICAgLy8gbWFuaGF0dGFuIGRpc3RhbmNlXG4gICAgICBjb25zdCBuYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gdGlsZS5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgICAgY29uc3QgY29sVmFsOiBudW1iZXIgPSBNYXRoLmFicyh0aWxlLnBvc2l0aW9uLnggLSB0aGlzLmVuZC5wb3NpdGlvbi54KTtcbiAgICAgIGNvbnN0IHJvd1ZhbDogbnVtYmVyID0gTWF0aC5hYnModGlsZS5wb3NpdGlvbi55IC0gdGhpcy5lbmQucG9zaXRpb24ueSk7XG4gICAgICBuYXZEYXRhLmhWYWwgPSBjb2xWYWwgKyByb3dWYWw7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUcodGlsZTogTmF2aWdhdG9yVGlsZSk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudCA9IHRpbGU7XG4gICAgY29uc3QgdGlsZU5hdkRhdGEgPSB0aWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmVpZ2hib3JzQ291bnQ7IGkrKykge1xuICAgICAgY29uc3QgeDogbnVtYmVyID0gdGlsZS5wb3NpdGlvbi54ICsgTmF2aWdhdG9yLmdldENvbE9mZnNldChpKTtcbiAgICAgIGNvbnN0IHk6IG51bWJlciA9IHRpbGUucG9zaXRpb24ueSArIHRoaXMuZ2V0Um93T2Zmc2V0KGkpO1xuICAgICAgY29uc3QgZXhwbG9yaW5nOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCA9IHRoaXMuZ3JpZC5maW5kVGlsZSh7IHgsIHkgfSk7XG5cbiAgICAgIGlmICghZXhwbG9yaW5nKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHBsb3JpbmdOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gZXhwbG9yaW5nLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG5cbiAgICAgIGlmIChleHBsb3JpbmcuaXNPYnN0YWNsZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRhaW5zKHRoaXMuY2xvc2VkLCBleHBsb3JpbmcpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGlsZS5pZCA9PT0gZXhwbG9yaW5nLmlkKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkLnB1c2goZXhwbG9yaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRQYXJlbnQodGlsZSwgZXhwbG9yaW5nKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb250YWlucyh0aGlzLm9wZW4sIGV4cGxvcmluZykpIHtcbiAgICAgICAgICB0aGlzLm9wZW4ucHVzaChleHBsb3JpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5hdmlnYXRvci5pc0RpYWdvbmFsKHRpbGUsIGV4cGxvcmluZykpIHtcbiAgICAgICAgICBleHBsb3JpbmdOYXZEYXRhLmdWYWwgPSB0aWxlTmF2RGF0YS5nVmFsICsgdGhpcy5kaWFnb25hbENvc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yaW5nTmF2RGF0YS5nVmFsID0gdGlsZU5hdkRhdGEuZ1ZhbCArIHRoaXMudmVydGljYWxDb3N0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGV4cGxvcmluZ05hdkRhdGEuZlZhbCA9IHRoaXMuY2FsY3VsYXRlRihleHBsb3JpbmcpO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHQgPSB0aGlzLmNob29zZU5leHQoKTtcblxuICAgIGlmIChuZXh0KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vbkV4cGxvcmUobmV4dCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRyhuZXh0KTtcbiAgICAgIH0sIDEwKTtcbiAgICAgIC8qXG4gICAgICB0aGlzLm9uRXhwbG9yZShuZXh0KTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlRyhuZXh0KTtcbiAgICAgICovXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhdGg6IE5hdmlnYXRvclRpbGVbXSA9IHRoaXMuZ2V0UGF0aCgpO1xuICAgICAgdGhpcy5vbkNvbXBsZXRlKHBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlRih0aWxlOiBOYXZpZ2F0b3JUaWxlKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGdWYWwsIGhWYWwgfTogTmF2aWdhdG9yRGF0YSA9IHRpbGUuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICByZXR1cm4gZ1ZhbCArIGhWYWw7XG4gIH1cblxuICBwcml2YXRlIGdldFJvd09mZnNldChpdGVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgLypcbiAgICAgICBpdGVyYXRpb24gPSAwLCAxLCBvciAyOiBbLTFdWy0xXVstMV1cbiAgICAgICBpdGVyYXRpb24gPSAzLCA0LCBvciA1OiBbIDBdWyAwXVsgMF1cbiAgICAgICBpdGVyYXRpb24gPSA2LCA3LCBvciA4OiBbKzFdWysxXVsrMV1cbiAgICAgKi9cbiAgICByZXR1cm4gdGhpcy5uZWlnaGJvcnNDb3VudCArIC1NYXRoLmZsb29yKCgzMiAtIGl0ZXJhdGlvbikgLyAzKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldENvbE9mZnNldChpdGVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgLypcbiAgICAgICBpdGVyYXRpb24gPSAwLCAxLCBvciAyOiBbLTFdWyAwXVsrMV1cbiAgICAgICBpdGVyYXRpb24gPSAzLCA0LCBvciA1OiBbLTFdWyAwXVsrMV1cbiAgICAgICBpdGVyYXRpb24gPSA2LCA3LCBvciA4OiBbLTFdWyAwXVsrMV1cbiAgICAgKi9cbiAgICByZXR1cm4gaXRlcmF0aW9uICUgMyAtIDE7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBpc0RpYWdvbmFsKFxuICAgIHRpbGU6IE5hdmlnYXRvclRpbGUsXG4gICAgY2hlY2tUaWxlOiBOYXZpZ2F0b3JUaWxlXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aWxlLnBvc2l0aW9uLnggIT09IGNoZWNrVGlsZS5wb3NpdGlvbi54ICYmXG4gICAgICB0aWxlLnBvc2l0aW9uLnkgIT09IGNoZWNrVGlsZS5wb3NpdGlvbi55XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFyZW50KFxuICAgIHRpbGU6IE5hdmlnYXRvclRpbGUsXG4gICAgY2hlY2tUaWxlOiBOYXZpZ2F0b3JUaWxlXG4gICk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBjb25zdCB0aWxlTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IHRpbGUuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICBjb25zdCBjaGVja05hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSBjaGVja1RpbGUuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcblxuICAgIGlmICghY2hlY2tOYXZEYXRhLnBhcmVudCkge1xuICAgICAgY2hlY2tOYXZEYXRhLnBhcmVudCA9IHRpbGU7XG4gICAgICByZXR1cm4gdGlsZTtcbiAgICB9XG5cbiAgICBjb25zdCBtb3ZlQ29zdCA9IE5hdmlnYXRvci5pc0RpYWdvbmFsKHRpbGUsIGNoZWNrVGlsZSlcbiAgICAgID8gdGhpcy5kaWFnb25hbENvc3RcbiAgICAgIDogdGhpcy52ZXJ0aWNhbENvc3Q7XG5cbiAgICBpZiAodGlsZU5hdkRhdGEuZ1ZhbCArIG1vdmVDb3N0IDwgY2hlY2tOYXZEYXRhLmdWYWwpIHtcbiAgICAgIGNoZWNrTmF2RGF0YS5wYXJlbnQgPSB0aWxlO1xuICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNob29zZU5leHQoKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIHRoaXMub3BlbiA9IHRoaXMub3Blbi5zb3J0KChhOiBOYXZpZ2F0b3JUaWxlLCBiOiBOYXZpZ2F0b3JUaWxlKSA9PiB7XG4gICAgICBjb25zdCBhTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGEuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgIGNvbnN0IGJOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gYi5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgICAgcmV0dXJuIGFOYXZEYXRhLmZWYWwgLSBiTmF2RGF0YS5mVmFsO1xuICAgIH0pO1xuICAgIGNvbnN0IG5leHQ6IE5hdmlnYXRvclRpbGUgfCB1bmRlZmluZWQgPSB0aGlzLm9wZW5bMF07XG5cbiAgICBpZiAoIW5leHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMub3Blbi5zaGlmdCgpO1xuICAgIHRoaXMuY2xvc2VkLnB1c2gobmV4dCk7XG5cbiAgICBpZiAobmV4dC5pZCA9PT0gdGhpcy5lbmQuaWQpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuZW5kO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICBwcml2YXRlIGdldFBhdGgoKTogTmF2aWdhdG9yVGlsZVtdIHtcbiAgICBjb25zdCBwYXRoOiBOYXZpZ2F0b3JUaWxlW10gPSBbXTtcbiAgICBsZXQgeyBjdXJyZW50IH0gPSB0aGlzO1xuXG4gICAgd2hpbGUgKGN1cnJlbnQuaWQgIT09IHRoaXMuYmVnaW4uaWQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnROYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gY3VycmVudC5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgICAgcGF0aC5wdXNoKGN1cnJlbnQpO1xuXG4gICAgICBpZiAoY3VycmVudE5hdkRhdGEucGFyZW50KSB7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50TmF2RGF0YS5wYXJlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXRoLnJldmVyc2UoKTtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGRlZmF1bHRPbkNvbXBsZXRlKHBhdGg6IE5hdmlnYXRvclRpbGVbXSkge1xuICAgIGNvbnNvbGUubG9nKHBhdGgpO1xuICB9XG59XG4iLCJpbXBvcnQgTmF2aWdhdG9yIGZyb20gJy4vTmF2aWdhdG9yJztcbmltcG9ydCBpZCBmcm9tICcuLi9pbnRlcmZhY2VzL2lkJztcbmltcG9ydCB1bmlxdWVJRCBmcm9tICcuLi91dGlsL3VuaXF1ZUlEJztcbmltcG9ydCBOYXZpZ2F0b3JUaWxlIGZyb20gJy4vTmF2aWdhdG9yVGlsZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRvckRhdGEgaW1wbGVtZW50cyBpZCB7XG4gIGlkOiBudW1iZXIgPSB1bmlxdWVJRCgpO1xuICBnVmFsOiBudW1iZXI7IC8vIGRpc3RhbmNlIGZyb20gc3RhcnRcbiAgaFZhbDogbnVtYmVyOyAvLyBkaXN0YW5jZSBmcm9tIGVuZFxuICBmVmFsOiBudW1iZXI7IC8vIGdDb3N0ICsgaENvc3RcbiAgcGFyZW50OiBOYXZpZ2F0b3JUaWxlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBuYXZpZ2F0b3I6IE5hdmlnYXRvcikge31cbn1cbiIsImltcG9ydCBpZCBmcm9tICcuLi9pbnRlcmZhY2VzL2lkJztcbmltcG9ydCB1bmlxdWVJZCBmcm9tICcuLi91dGlsL3VuaXF1ZUlEJztcbmltcG9ydCBwb2ludCBmcm9tICcuLi9pbnRlcmZhY2VzL3BvaW50JztcbmltcG9ydCBOYXZpZ2F0b3IgZnJvbSAnLi9OYXZpZ2F0b3InO1xuaW1wb3J0IHsgY29udGFpbnMgfSBmcm9tICcuLi91dGlsL2lkJztcbmltcG9ydCBOYXZpZ2F0b3JEYXRhIGZyb20gJy4vTmF2aWdhdG9yRGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRvclRpbGUgaW1wbGVtZW50cyBpZCB7XG4gIGlkOiBudW1iZXIgPSB1bmlxdWVJZCgpO1xuICBpc09ic3RhY2xlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgbmF2aWdhdG9yczogTmF2aWdhdG9yRGF0YVtdID0gW107XG5cbiAgY29uc3RydWN0b3IocmVhZG9ubHkgcG9zaXRpb246IHBvaW50KSB7fVxuXG4gIHJlZ2lzdGVyTmF2aWdhdG9yRGF0YShuYXZpZ2F0b3I6IE5hdmlnYXRvcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5hdmlnYXRpb25EYXRhOiBOYXZpZ2F0b3JEYXRhID0gbmV3IE5hdmlnYXRvckRhdGEobmF2aWdhdG9yKTtcblxuICAgIGlmIChjb250YWlucyh0aGlzLm5hdmlnYXRvcnMsIG5hdmlnYXRpb25EYXRhKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMubmF2aWdhdG9ycy5wdXNoKG5hdmlnYXRpb25EYXRhKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldE5hdmlnYXRvckRhdGEobmF2aWdhdG9yOiBOYXZpZ2F0b3IpOiBOYXZpZ2F0b3JEYXRhIHwgbnVsbCB7XG4gICAgY29uc3QgbmF2RGF0YSA9IHRoaXMubmF2aWdhdG9ycy5maW5kKChuYXZpZ2F0aW9uRGF0YTogTmF2aWdhdG9yRGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIG5hdmlnYXRpb25EYXRhLm5hdmlnYXRvci5pZCA9PT0gbmF2aWdhdG9yLmlkO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5hdkRhdGEgPyBuYXZEYXRhIDogbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSAnLi9HcmlkJztcbmltcG9ydCBOYXZpZ2F0b3JUaWxlIGZyb20gJy4vTmF2aWdhdG9yVGlsZSc7XG5pbXBvcnQgeyBpbnQgfSBmcm9tICcuLi91dGlsL3JhbmRvbSc7XG5pbXBvcnQgeyBjb250YWlucywgZmluZEluZGV4IH0gZnJvbSAnLi4vdXRpbC9pZCc7XG5pbXBvcnQgcm93IGZyb20gJy4uL2ludGVyZmFjZXMvcm93JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzdGFjbGVzIHtcbiAgcHJpdmF0ZSByZWFkb25seSBvcGVuTGlzdDogTmF2aWdhdG9yVGlsZVtdID0gW107XG4gIHByaXZhdGUgcmVhZG9ubHkgY2xvc2VkTGlzdDogTmF2aWdhdG9yVGlsZVtdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBHcmlkKSB7XG4gICAgdGhpcy5vcGVuTGlzdCA9IGdyaWQudGlsZXM7XG4gIH1cblxuICBnZXQgbGlzdCgpOiBOYXZpZ2F0b3JUaWxlW10ge1xuICAgIHJldHVybiB0aGlzLmNsb3NlZExpc3Q7XG4gIH1cblxuICBhZGQodGlsZTogTmF2aWdhdG9yVGlsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGUodHJ1ZSwgdGlsZSk7XG4gIH1cblxuICByZW1vdmUodGlsZTogTmF2aWdhdG9yVGlsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGUoZmFsc2UsIHRpbGUpO1xuICB9XG5cbiAgYWRkUmFuZG9tKGNvdW50OiBudW1iZXIgPSAxKTogTmF2aWdhdG9yVGlsZSB8IHJvdyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVNdWx0aXBsZVJhbmRvbSh0cnVlLCBjb3VudCk7XG4gIH1cblxuICByZW1vdmVSYW5kb20oY291bnQ6IG51bWJlciA9IDEpOiBOYXZpZ2F0b3JUaWxlIHwgcm93IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZU11bHRpcGxlUmFuZG9tKGZhbHNlLCBjb3VudCk7XG4gIH1cblxuICBnZXRSYW5kb21PcGVuKCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5nZXRSYW5kb20odHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldFJhbmRvbShvcGVuOiBib29sZWFuKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIGNvbnN0IGxpc3QgPSBvcGVuID8gdGhpcy5vcGVuTGlzdCA6IHRoaXMuY2xvc2VkTGlzdDtcbiAgICBjb25zdCByYW5kb206IG51bWJlciA9IGludCgwLCBsaXN0Lmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IHRpbGUgPSBsaXN0W3JhbmRvbV07XG4gICAgcmV0dXJuIHRpbGUgPyB0aWxlIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgbWFuaXB1bGF0ZU11bHRpcGxlUmFuZG9tKFxuICAgIGFkZDogYm9vbGVhbixcbiAgICBjb3VudDogbnVtYmVyXG4gICk6IE5hdmlnYXRvclRpbGUgfCByb3cgfCBudWxsIHtcbiAgICBjb25zdCB0aWxlczogcm93ID0gW107XG5cbiAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgdGlsZTogTmF2aWdhdG9yVGlsZSA9IHRoaXMubWFuaXB1bGF0ZVNpbmdsZVJhbmRvbShhZGQpO1xuICAgICAgICB0aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY291bnQgPT09IDEgPyB0aWxlc1swXSA6IHRpbGVzO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBtYW5pcHVsYXRlU2luZ2xlUmFuZG9tKGFkZDogYm9vbGVhbik6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBjb25zdCB0aWxlID0gdGhpcy5nZXRSYW5kb20oYWRkKTtcblxuICAgIGlmICh0aWxlKSB7XG4gICAgICB0aGlzLm1hbmlwdWxhdGUoYWRkLCB0aWxlKTtcbiAgICAgIHJldHVybiB0aWxlO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBtYW5pcHVsYXRlKGFkZDogYm9vbGVhbiwgdGlsZTogTmF2aWdhdG9yVGlsZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzSW52YWxpZDogYm9vbGVhbiA9IGFkZCA/IHRpbGUuaXNPYnN0YWNsZSA6ICF0aWxlLmlzT2JzdGFjbGU7XG5cbiAgICBpZiAoaXNJbnZhbGlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGxpc3Q6IE5hdmlnYXRvclRpbGVbXTtcbiAgICBsZXQgb3RoZXJMaXN0OiBOYXZpZ2F0b3JUaWxlW107XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBsaXN0ID0gdGhpcy5vcGVuTGlzdDtcbiAgICAgIG90aGVyTGlzdCA9IHRoaXMuY2xvc2VkTGlzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdCA9IHRoaXMuY2xvc2VkTGlzdDtcbiAgICAgIG90aGVyTGlzdCA9IHRoaXMub3Blbkxpc3Q7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhaW5zKGxpc3QsIHRpbGUpKSB7XG4gICAgICB0aWxlLmlzT2JzdGFjbGUgPSBhZGQ7XG4gICAgICBjb25zdCBpbmRleCA9IGZpbmRJbmRleChsaXN0LCB0aWxlKTtcbiAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIG90aGVyTGlzdC5wdXNoKHRpbGUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgc2l6ZSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpemUnO1xuaW1wb3J0IHBvaW50IGZyb20gJy4uL2ludGVyZmFjZXMvcG9pbnQnO1xuaW1wb3J0IGlkIGZyb20gJy4uL2ludGVyZmFjZXMvaWQnO1xuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJy4uL3V0aWwvdW5pcXVlSUQnO1xuaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi4vY2xhc3Nlcy9OYXZpZ2F0b3JUaWxlJztcbmltcG9ydCB7IHN0YXJ0LCBvYnN0YWNsZSwgb3V0bGluZSwgZW1wdHkgfSBmcm9tICcuLi9jb25zdC9jb2xvcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlIGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSWQoKTtcbiAgbmF2aWdhdG9yVGlsZTogTmF2aWdhdG9yVGlsZSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9pc09ic3RhY2xlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc2l6ZTogc2l6ZSxcbiAgICBwcml2YXRlIHBvc2l0aW9uOiBwb2ludCxcbiAgICBwcml2YXRlIF9ncmlkQ29vcmRzOiBwb2ludCxcbiAgICBwcml2YXRlIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICApIHtcbiAgICB0aGlzLm5hdmlnYXRvclRpbGUgPSBuZXcgTmF2aWdhdG9yVGlsZShfZ3JpZENvb3Jkcyk7XG4gICAgdGhpcy5zdHJva2Uob3V0bGluZSk7XG4gIH1cblxuICBnZXQgaXNPYnN0YWNsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNPYnN0YWNsZTtcbiAgfVxuXG4gIGdldCBpc1N0YXJ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1N0YXJ0O1xuICB9XG4gIGdldCBjYW5CZVN0YXJ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pc09ic3RhY2xlICYmICF0aGlzLmlzU3RhcnQ7XG4gIH1cbiAgZ2V0IGdyaWRDb29yZHMoKTogcG9pbnQge1xuICAgIHJldHVybiB0aGlzLl9ncmlkQ29vcmRzO1xuICB9XG5cbiAgYmVjb21lU3RhcnQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmNhbkJlU3RhcnQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmZpbGwoc3RhcnQpO1xuICAgIHRoaXMuc3Ryb2tlKG91dGxpbmUpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLl9pc1N0YXJ0ID0gZmFsc2U7XG4gICAgdGhpcy5maWxsKGVtcHR5KTtcbiAgICB0aGlzLnN0cm9rZShvdXRsaW5lKTtcbiAgfVxuXG4gIGJlY29tZU9ic3RhY2xlKCk6IHZvaWQge1xuICAgIHRoaXMuX2lzT2JzdGFjbGUgPSB0cnVlO1xuICAgIHRoaXMuZmlsbChvYnN0YWNsZSk7XG4gIH1cblxuICBjb250YWluc1BvaW50KHsgeCwgeSB9OiBwb2ludCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB4ID49IHRoaXMucG9zaXRpb24ueCAmJlxuICAgICAgeCA8PSB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUud2lkdGggJiZcbiAgICAgIHkgPj0gdGhpcy5wb3NpdGlvbi55ICYmXG4gICAgICB5IDw9IHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS5oZWlnaHRcbiAgICApO1xuICB9XG5cbiAgZmlsbChjb2xvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kcmF3KCgpID0+IHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdHJva2UoY29sb3I6IHN0cmluZyA9ICdibGFjaycpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXcoKCkgPT4ge1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gMTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhdyhkcmF3QWN0aW9uOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLnBvc2l0aW9uO1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5zaXplO1xuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAvL3RoaXMuY29udGV4dC5hcmMoeCwgeSAsIHdpZHRoLCAwLCAyKk1hdGguUEkpO1xuICAgIHRoaXMuY29udGV4dC5yZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIGRyYXdBY3Rpb24oKTtcbiAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gIH1cbn1cbiIsImNvbnN0IHN0YXJ0OiBzdHJpbmcgPSAncmVkJztcbmNvbnN0IG9ic3RhY2xlOiBzdHJpbmcgPSAnYmxhY2snO1xuY29uc3Qgb3V0bGluZTogc3RyaW5nID0gJ2JsYWNrJztcbmNvbnN0IGVtcHR5OiBzdHJpbmcgPSAnd2hpdGUnO1xuXG5leHBvcnQgeyBzdGFydCwgb2JzdGFjbGUsIG91dGxpbmUsIGVtcHR5IH07XG4iLCJpbXBvcnQgQ2FudmFzIGZyb20gJy4vY2xhc3Nlcy9DYW52YXMnO1xuaW1wb3J0IEdyaWQgZnJvbSAnLi9jbGFzc2VzL0dyaWQnO1xuaW1wb3J0IENsaWNrIGZyb20gJy4vY2xhc3Nlcy9DbGljayc7XG5pbXBvcnQgTmF2aWdhdG9yIGZyb20gJy4vY2xhc3Nlcy9OYXZpZ2F0b3InO1xuaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9jbGFzc2VzL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IHNpemUgZnJvbSAnaW50ZXJmYWNlcy9zaXplJztcbi8vIGltcG9ydCB7IGNvbG9yIH0gZnJvbSBcIi4vdXRpbC9yYW5kb21cIjtcblxuY29uc3QgY2FudmFzU2l6ZTogc2l6ZSA9IHtcbiAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbn07XG5jb25zdCBjYW52YXM6IENhbnZhcyA9IG5ldyBDYW52YXMoJyNjYW52YXMnLCBjYW52YXNTaXplKTtcbmNvbnN0IGdyaWRTaXplOiBzaXplID0geyB3aWR0aDogMTAwLCBoZWlnaHQ6IDc1IH07XG5jb25zdCB0aWxlU2l6ZTogc2l6ZSA9IHsgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwIH07XG5jb25zdCBncmlkOiBHcmlkID0gbmV3IEdyaWQoZ3JpZFNpemUpO1xubmV3IENsaWNrKGNhbnZhcy5jYW52YXMsIGdyaWQpO1xuY2FudmFzLmRyYXdHcmlkKGdyaWRTaXplLCB0aWxlU2l6ZSk7XG5cbmNvbnN0IG9uTmF2RXhwbG9yZSA9ICh7IHBvc2l0aW9uIH06IE5hdmlnYXRvclRpbGUpID0+IHtcbiAgY29uc3QgdGlsZSA9IGNhbnZhcy5nZXRUaWxlKHBvc2l0aW9uKTtcbiAgdGlsZS5maWxsKCdibHVlJyk7XG4gIHRpbGUuc3Ryb2tlKCk7XG59O1xuY29uc3Qgb25OYXZDb21wbGV0ZSA9IChwYXRoOiBOYXZpZ2F0b3JUaWxlW10pOiB2b2lkID0+IHtcbiAgcGF0aC5mb3JFYWNoKCh7IHBvc2l0aW9uIH06IE5hdmlnYXRvclRpbGUpID0+IHtcbiAgICBjb25zdCB0aWxlID0gY2FudmFzLmdldFRpbGUocG9zaXRpb24pO1xuICAgIHRpbGUuZmlsbCgnZ3JlZW4nKTtcbiAgICB0aWxlLnN0cm9rZSgpO1xuICB9KTtcbn07XG5cbmdyaWQub2JzdGFjbGVzLmFkZFJhbmRvbSgzMDAwKTtcblxuZ3JpZC5vYnN0YWNsZXMubGlzdC5mb3JFYWNoKCh7IHBvc2l0aW9uIH06IE5hdmlnYXRvclRpbGUpID0+IHtcbiAgY29uc3QgdGlsZSA9IGNhbnZhcy5nZXRUaWxlKHBvc2l0aW9uKTtcbiAgdGlsZS5maWxsKCdibGFjaycpO1xuICB0aWxlLnN0cm9rZSgpO1xufSk7XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICBjb25zdCBuYXZCZWdpbjogTmF2aWdhdG9yVGlsZSA9IGdyaWQucmFuZG9tRnJlZVRpbGUoKTtcbiAgY29uc3QgbmF2RW5kOiBOYXZpZ2F0b3JUaWxlID0gZ3JpZC5yYW5kb21GcmVlVGlsZSgpO1xuICBjb25zdCBuYXZpZ2F0b3I6IE5hdmlnYXRvciA9IG5ldyBOYXZpZ2F0b3IoXG4gICAgZ3JpZCxcbiAgICBuYXZCZWdpbixcbiAgICBuYXZFbmQsXG4gICAgb25OYXZFeHBsb3JlLFxuICAgIG9uTmF2Q29tcGxldGVcbiAgKTtcbiAgbmF2aWdhdG9yLnN0YXJ0KCk7XG59XG4iLCJpbXBvcnQgaWQgZnJvbSAnLi4vaW50ZXJmYWNlcy9pZCc7XG5cbmNvbnN0IGNvbnRhaW5zID0gKGFycmF5OiBpZFtdLCBlbGVtZW50OiBpZCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gZmluZEluZGV4KGFycmF5LCBlbGVtZW50KSAhPT0gLTE7XG59O1xuXG5jb25zdCBmaW5kSW5kZXggPSAoYXJyYXk6IGlkW10sIGZpbmQ6IGlkKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIGFycmF5LmZpbmRJbmRleCgoZWxlbWVudDogaWQpID0+IGVsZW1lbnQuaWQgPT09IGZpbmQuaWQpO1xufTtcblxuZXhwb3J0IHsgY29udGFpbnMsIGZpbmRJbmRleCB9O1xuIiwiY29uc3QgaW50ID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLnJvdW5kKGZsb2F0KG1pbiwgbWF4KSk7XG59O1xuXG5jb25zdCBmbG9hdCA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xufTtcblxuY29uc3QgY29sb3I9ICgpID0+IHtcbiAgY29uc3QgciA9IGludCgwLCAyNTUpO1xuICBjb25zdCBnID0gMDsvL2ludCgwLCAyNTUpO1xuICBjb25zdCBiID0gMDsvL2ludCgwLCAyNTUpO1xuICByZXR1cm4gYHJnYigke3J9LCR7Z30sJHtifSlgO1xufTtcblxuZXhwb3J0IHsgaW50LCBmbG9hdCwgY29sb3IgfTtcbiIsImxldCBpZCA9IDA7XG5cbmNvbnN0IHVuaXF1ZUlkID0gKCk6IG51bWJlciA9PiBpZCsrO1xuXG5leHBvcnQgZGVmYXVsdCB1bmlxdWVJZDtcbiJdLCJzb3VyY2VSb290IjoiIn0=