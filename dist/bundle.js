module.exports =
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

/***/ "./src/classes/Grid.ts":
/*!*****************************!*\
  !*** ./src/classes/Grid.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NavigatorTile_1 = __importDefault(__webpack_require__(/*! ./NavigatorTile */ "./src/classes/NavigatorTile.ts"));
const random_1 = __webpack_require__(/*! ../util/random */ "./src/util/random.ts");
const Obstacles_1 = __importDefault(__webpack_require__(/*! ./Obstacles */ "./src/classes/Obstacles.ts"));
const defaultSize = { width: 10, height: 10 };
class Grid {
    constructor(size = defaultSize) {
        this.size = size;
        this.tiles = [];
        this.rows = [];
        this.obstacles = new Obstacles_1.default(this);
        this.makeGrid();
    }
    randomTile() {
        const x = random_1.int(0, this.size.width - 1);
        const y = random_1.int(0, this.size.height - 1);
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
                const tile = new NavigatorTile_1.default({ x, y });
                this.tiles.push(tile);
                row.push(tile);
            }
            this.rows.push(row);
        }
    }
}
exports.default = Grid;


/***/ }),

/***/ "./src/classes/Navigator.ts":
/*!**********************************!*\
  !*** ./src/classes/Navigator.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueID_1 = __importDefault(__webpack_require__(/*! ../util/uniqueID */ "./src/util/uniqueID.ts"));
const id_1 = __webpack_require__(/*! ../util/id */ "./src/util/id.ts");
class Navigator {
    constructor(grid, begin, end, onExplore = () => { }, onComplete = Navigator.defaultOnComplete) {
        this.grid = grid;
        this.begin = begin;
        this.end = end;
        this.onExplore = onExplore;
        this.onComplete = onComplete;
        this.id = uniqueID_1.default();
        this._path = [];
        this.verticalCost = 1;
        this.diagonalCost = 1.4;
        this.neighborsCount = 9;
        this.tiles = [];
        this.open = [];
        this.closed = [];
    }
    get path() {
        return this._path;
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
            if (id_1.contains(this.closed, exploring)) {
                continue;
            }
            if (tile.id === exploring.id) {
                this.closed.push(exploring);
            }
            else {
                if (!this.getParent(tile, exploring)) {
                    continue;
                }
                if (!id_1.contains(this.open, exploring)) {
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
        this._path = [];
        let { current } = this;
        while (current.id !== this.begin.id) {
            const currentNavData = current.getNavigatorData(this);
            this._path.push(current);
            if (currentNavData.parent) {
                current = currentNavData.parent;
            }
            else {
                break;
            }
        }
        this._path.reverse();
        return this._path;
    }
    static defaultOnComplete(path) {
        console.log(path);
    }
}
exports.default = Navigator;


/***/ }),

/***/ "./src/classes/NavigatorData.ts":
/*!**************************************!*\
  !*** ./src/classes/NavigatorData.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueID_1 = __importDefault(__webpack_require__(/*! ../util/uniqueID */ "./src/util/uniqueID.ts"));
class NavigatorData {
    constructor(navigator) {
        this.navigator = navigator;
        this.id = uniqueID_1.default();
    }
}
exports.default = NavigatorData;


/***/ }),

/***/ "./src/classes/NavigatorTile.ts":
/*!**************************************!*\
  !*** ./src/classes/NavigatorTile.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqueID_1 = __importDefault(__webpack_require__(/*! ../util/uniqueID */ "./src/util/uniqueID.ts"));
const id_1 = __webpack_require__(/*! ../util/id */ "./src/util/id.ts");
const NavigatorData_1 = __importDefault(__webpack_require__(/*! ./NavigatorData */ "./src/classes/NavigatorData.ts"));
class NavigatorTile {
    constructor(position) {
        this.position = position;
        this.id = uniqueID_1.default();
        this.isObstacle = false;
        this.navigators = [];
    }
    registerNavigatorData(navigator) {
        const navigationData = new NavigatorData_1.default(navigator);
        if (id_1.contains(this.navigators, navigationData)) {
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
exports.default = NavigatorTile;


/***/ }),

/***/ "./src/classes/Obstacles.ts":
/*!**********************************!*\
  !*** ./src/classes/Obstacles.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const random_1 = __webpack_require__(/*! ../util/random */ "./src/util/random.ts");
const id_1 = __webpack_require__(/*! ../util/id */ "./src/util/id.ts");
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
        const random = random_1.int(0, list.length - 1);
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
        if (id_1.contains(list, tile)) {
            tile.isObstacle = add;
            const index = id_1.findIndex(list, tile);
            list.splice(index, 1);
            otherList.push(tile);
            return true;
        }
        return false;
    }
}
exports.default = Obstacles;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Grid_1 = __importDefault(__webpack_require__(/*! ./classes/Grid */ "./src/classes/Grid.ts"));
exports.Grid = Grid_1.default;
const Navigator_1 = __importDefault(__webpack_require__(/*! ./classes/Navigator */ "./src/classes/Navigator.ts"));
exports.Navigator = Navigator_1.default;
const NavigatorTile_1 = __importDefault(__webpack_require__(/*! ./classes/NavigatorTile */ "./src/classes/NavigatorTile.ts"));
exports.NavigatorTile = NavigatorTile_1.default;


/***/ }),

/***/ "./src/util/id.ts":
/*!************************!*\
  !*** ./src/util/id.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const contains = (array, element) => {
    return findIndex(array, element) !== -1;
};
exports.contains = contains;
const findIndex = (array, find) => {
    return array.findIndex((element) => element.id === find.id);
};
exports.findIndex = findIndex;


/***/ }),

/***/ "./src/util/random.ts":
/*!****************************!*\
  !*** ./src/util/random.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const int = (min, max) => {
    return Math.round(float(min, max));
};
exports.int = int;
const float = (min, max) => {
    return Math.random() * (max - min) + min;
};
exports.float = float;
const color = () => {
    const r = int(0, 255);
    const g = 0; //int(0, 255);
    const b = 0; //int(0, 255);
    return `rgb(${r},${g},${b})`;
};
exports.color = color;


/***/ }),

/***/ "./src/util/uniqueID.ts":
/*!******************************!*\
  !*** ./src/util/uniqueID.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let id = 0;
const uniqueId = () => id++;
exports.default = uniqueId;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2NsYXNzZXMvR3JpZC50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvY2xhc3Nlcy9OYXZpZ2F0b3IudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL2NsYXNzZXMvTmF2aWdhdG9yRGF0YS50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvY2xhc3Nlcy9OYXZpZ2F0b3JUaWxlLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy9jbGFzc2VzL09ic3RhY2xlcy50cyIsIndlYnBhY2s6Ly9wdWxzYXItcGF0aGZpbmRpbmcvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvaWQudHMiLCJ3ZWJwYWNrOi8vcHVsc2FyLXBhdGhmaW5kaW5nLy4vc3JjL3V0aWwvcmFuZG9tLnRzIiwid2VicGFjazovL3B1bHNhci1wYXRoZmluZGluZy8uL3NyYy91dGlsL3VuaXF1ZUlELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFB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RUFBVSxFQUFFO0lBQy9DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBYU8sa0JBQUc7QUFYWixNQUFNLEtBQUssR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQVUsRUFBRTtJQUNqRCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDM0MsQ0FBQyxDQUFDO0FBU1ksc0JBQUs7QUFQbkIsTUFBTSxLQUFLLEdBQUUsR0FBRyxFQUFFO0lBQ2hCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGVBQWM7SUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGVBQWM7SUFDMUIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBRW1CLHNCQUFLOzs7Ozs7Ozs7Ozs7Ozs7QUNmMUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRVgsTUFBTSxRQUFRLEdBQUcsR0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7QUFFcEMsa0JBQWUsUUFBUSxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9OYXZpZ2F0b3JUaWxlJztcbmltcG9ydCBzaXplIGZyb20gJy4uL2ludGVyZmFjZXMvc2l6ZSc7XG5pbXBvcnQgcG9pbnQgZnJvbSAnLi4vaW50ZXJmYWNlcy9wb2ludCc7XG5pbXBvcnQgcm93IGZyb20gJy4uL2ludGVyZmFjZXMvcm93JztcbmltcG9ydCB7IGludCB9IGZyb20gJy4uL3V0aWwvcmFuZG9tJztcbmltcG9ydCBPYnN0YWNsZXMgZnJvbSAnLi9PYnN0YWNsZXMnO1xuXG5jb25zdCBkZWZhdWx0U2l6ZTogc2l6ZSA9IHsgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwIH07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQge1xuICByZWFkb25seSB0aWxlczogTmF2aWdhdG9yVGlsZVtdID0gW107XG4gIHJlYWRvbmx5IHJvd3M6IHJvd1tdID0gW107XG4gIHB1YmxpYyByZWFkb25seSBvYnN0YWNsZXM6IE9ic3RhY2xlcyA9IG5ldyBPYnN0YWNsZXModGhpcyk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzaXplOiBzaXplID0gZGVmYXVsdFNpemUpIHtcbiAgICB0aGlzLm1ha2VHcmlkKCk7XG4gIH1cblxuICByYW5kb21UaWxlKCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBjb25zdCB4ID0gaW50KDAsIHRoaXMuc2l6ZS53aWR0aCAtIDEpO1xuICAgIGNvbnN0IHkgPSBpbnQoMCwgdGhpcy5zaXplLmhlaWdodCAtIDEpO1xuXG4gICAgcmV0dXJuIHRoaXMuZmluZFRpbGUoeyB4LCB5IH0pO1xuICB9XG5cbiAgcmFuZG9tRnJlZVRpbGUoKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm9ic3RhY2xlcy5nZXRSYW5kb21PcGVuKCk7XG4gIH1cblxuICBmaW5kVGlsZShwb3NpdGlvbjogcG9pbnQpOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgcmV0dXJuIEdyaWQuZ2V0VGlsZShwb3NpdGlvbiwgdGhpcy5yb3dzKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldFRpbGUoeyB4LCB5IH06IHBvaW50LCBsaXN0OiByb3dbXSk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBjb25zdCByb3c6IHJvdyA9IGxpc3RbeV07XG4gICAgcmV0dXJuIChyb3cgJiYgcm93Lmxlbmd0aCA+IHgpID8gcm93W3hdIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUdyaWQoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnNpemUuaGVpZ2h0OyB5KyspIHtcbiAgICAgIGNvbnN0IHJvdzogcm93ID0gW107XG5cbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5zaXplLndpZHRoOyB4KyspIHtcbiAgICAgICAgY29uc3QgdGlsZTogTmF2aWdhdG9yVGlsZSA9IG5ldyBOYXZpZ2F0b3JUaWxlKHsgeCwgeSB9KTtcbiAgICAgICAgdGhpcy50aWxlcy5wdXNoKHRpbGUpO1xuICAgICAgICByb3cucHVzaCh0aWxlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yb3dzLnB1c2gocm93KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0b3JUaWxlIGZyb20gJy4vTmF2aWdhdG9yVGlsZSc7XG5pbXBvcnQgTmF2aWdhdG9yRGF0YSBmcm9tICcuL05hdmlnYXRvckRhdGEnO1xuaW1wb3J0IHJvdyBmcm9tICcuLi9pbnRlcmZhY2VzL3Jvdyc7XG5pbXBvcnQgR3JpZCBmcm9tICcuL0dyaWQnO1xuaW1wb3J0IHVuaXF1ZUlEIGZyb20gJy4uL3V0aWwvdW5pcXVlSUQnO1xuaW1wb3J0IGlkIGZyb20gJy4uL2ludGVyZmFjZXMvaWQnO1xuaW1wb3J0IHsgY29udGFpbnMgfSBmcm9tICcuLi91dGlsL2lkJztcbnR5cGUgb25FeHBsb3JlID0gKHRpbGU6IE5hdmlnYXRvclRpbGUpID0+IHZvaWQ7XG50eXBlIG9uQ29tcGxldGUgPSAocGF0aDogTmF2aWdhdG9yVGlsZVtdKSA9PiB2b2lkO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0b3IgaW1wbGVtZW50cyBpZCB7XG4gIGlkOiBudW1iZXIgPSB1bmlxdWVJRCgpO1xuICBwcml2YXRlIF9wYXRoOiByb3cgPSBbXTtcbiAgcHJpdmF0ZSB2ZXJ0aWNhbENvc3Q6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgZGlhZ29uYWxDb3N0OiBudW1iZXIgPSAxLjQ7XG4gIHByaXZhdGUgbmVpZ2hib3JzQ291bnQ6IG51bWJlciA9IDk7XG4gIHByaXZhdGUgdGlsZXM6IHJvdyA9IFtdO1xuICBwcml2YXRlIG9wZW46IHJvdyA9IFtdO1xuICBwcml2YXRlIGNsb3NlZDogcm93ID0gW107XG4gIHByaXZhdGUgY3VycmVudDogTmF2aWdhdG9yVGlsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGdyaWQ6IEdyaWQsXG4gICAgcHJpdmF0ZSBiZWdpbjogTmF2aWdhdG9yVGlsZSxcbiAgICBwcml2YXRlIGVuZDogTmF2aWdhdG9yVGlsZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9uRXhwbG9yZTogb25FeHBsb3JlID0gKCkgPT4ge30sXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkNvbXBsZXRlOiBvbkNvbXBsZXRlID0gTmF2aWdhdG9yLmRlZmF1bHRPbkNvbXBsZXRlXG4gICkge31cblxuICBnZXQgcGF0aCgpOiByb3cge1xuICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRPcGVuVGlsZXModGhpcy5ncmlkKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUgoKTtcbiAgICB0aGlzLmNsb3NlZC5wdXNoKHRoaXMuYmVnaW4pO1xuICAgIGNvbnN0IGJlZ2luTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IHRoaXMuYmVnaW4uZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICBiZWdpbk5hdkRhdGEuZ1ZhbCA9IDA7XG4gICAgdGhpcy5jYWxjdWxhdGVHKHRoaXMuYmVnaW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRPcGVuVGlsZXMoZ3JpZDogR3JpZCk6IHZvaWQge1xuICAgIGdyaWQucm93cy5mb3JFYWNoKChyb3c6IHJvdykgPT4ge1xuICAgICAgY29uc3QgbmF2aWdhdG9yVGlsZXM6IE5hdmlnYXRvclRpbGVbXSA9IHJvdy5tYXAoKHRpbGU6IE5hdmlnYXRvclRpbGUpID0+IHtcbiAgICAgICAgdGlsZS5yZWdpc3Rlck5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgICAgIHJldHVybiB0aWxlO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnRpbGVzID0gdGhpcy50aWxlcy5jb25jYXQobmF2aWdhdG9yVGlsZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVIKCk6IHZvaWQge1xuICAgIHRoaXMudGlsZXMuZm9yRWFjaCgodGlsZTogTmF2aWdhdG9yVGlsZSkgPT4ge1xuICAgICAgLy8gbWFuaGF0dGFuIGRpc3RhbmNlXG4gICAgICBjb25zdCBuYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gdGlsZS5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgICAgY29uc3QgY29sVmFsOiBudW1iZXIgPSBNYXRoLmFicyh0aWxlLnBvc2l0aW9uLnggLSB0aGlzLmVuZC5wb3NpdGlvbi54KTtcbiAgICAgIGNvbnN0IHJvd1ZhbDogbnVtYmVyID0gTWF0aC5hYnModGlsZS5wb3NpdGlvbi55IC0gdGhpcy5lbmQucG9zaXRpb24ueSk7XG4gICAgICBuYXZEYXRhLmhWYWwgPSBjb2xWYWwgKyByb3dWYWw7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUcodGlsZTogTmF2aWdhdG9yVGlsZSk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudCA9IHRpbGU7XG4gICAgY29uc3QgdGlsZU5hdkRhdGEgPSB0aWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmVpZ2hib3JzQ291bnQ7IGkrKykge1xuICAgICAgY29uc3QgeDogbnVtYmVyID0gdGlsZS5wb3NpdGlvbi54ICsgTmF2aWdhdG9yLmdldENvbE9mZnNldChpKTtcbiAgICAgIGNvbnN0IHk6IG51bWJlciA9IHRpbGUucG9zaXRpb24ueSArIHRoaXMuZ2V0Um93T2Zmc2V0KGkpO1xuICAgICAgY29uc3QgZXhwbG9yaW5nOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCA9IHRoaXMuZ3JpZC5maW5kVGlsZSh7IHgsIHkgfSk7XG5cbiAgICAgIGlmICghZXhwbG9yaW5nKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHBsb3JpbmdOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gZXhwbG9yaW5nLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG5cbiAgICAgIGlmIChleHBsb3JpbmcuaXNPYnN0YWNsZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnRhaW5zKHRoaXMuY2xvc2VkLCBleHBsb3JpbmcpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGlsZS5pZCA9PT0gZXhwbG9yaW5nLmlkKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkLnB1c2goZXhwbG9yaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRQYXJlbnQodGlsZSwgZXhwbG9yaW5nKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb250YWlucyh0aGlzLm9wZW4sIGV4cGxvcmluZykpIHtcbiAgICAgICAgICB0aGlzLm9wZW4ucHVzaChleHBsb3JpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE5hdmlnYXRvci5pc0RpYWdvbmFsKHRpbGUsIGV4cGxvcmluZykpIHtcbiAgICAgICAgICBleHBsb3JpbmdOYXZEYXRhLmdWYWwgPSB0aWxlTmF2RGF0YS5nVmFsICsgdGhpcy5kaWFnb25hbENvc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yaW5nTmF2RGF0YS5nVmFsID0gdGlsZU5hdkRhdGEuZ1ZhbCArIHRoaXMudmVydGljYWxDb3N0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGV4cGxvcmluZ05hdkRhdGEuZlZhbCA9IHRoaXMuY2FsY3VsYXRlRihleHBsb3JpbmcpO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHQgPSB0aGlzLmNob29zZU5leHQoKTtcblxuICAgIGlmIChuZXh0KSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICB0aGlzLm9uRXhwbG9yZShuZXh0KTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVHKG5leHQpO1xuICAgICAgfSwgMTApXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhdGg6IE5hdmlnYXRvclRpbGVbXSA9IHRoaXMuZ2V0UGF0aCgpO1xuICAgICAgdGhpcy5vbkNvbXBsZXRlKHBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlRih0aWxlOiBOYXZpZ2F0b3JUaWxlKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGdWYWwsIGhWYWwgfTogTmF2aWdhdG9yRGF0YSA9IHRpbGUuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICByZXR1cm4gZ1ZhbCArIGhWYWw7XG4gIH1cblxuICBwcml2YXRlIGdldFJvd09mZnNldChpdGVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgLypcbiAgICAgICBpdGVyYXRpb24gPSAwLCAxLCBvciAyOiBbLTFdWy0xXVstMV1cbiAgICAgICBpdGVyYXRpb24gPSAzLCA0LCBvciA1OiBbIDBdWyAwXVsgMF1cbiAgICAgICBpdGVyYXRpb24gPSA2LCA3LCBvciA4OiBbKzFdWysxXVsrMV1cbiAgICAgKi9cbiAgICByZXR1cm4gdGhpcy5uZWlnaGJvcnNDb3VudCArIC1NYXRoLmZsb29yKCgzMiAtIGl0ZXJhdGlvbikgLyAzKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIGdldENvbE9mZnNldChpdGVyYXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgLypcbiAgICAgICBpdGVyYXRpb24gPSAwLCAxLCBvciAyOiBbLTFdWyAwXVsrMV1cbiAgICAgICBpdGVyYXRpb24gPSAzLCA0LCBvciA1OiBbLTFdWyAwXVsrMV1cbiAgICAgICBpdGVyYXRpb24gPSA2LCA3LCBvciA4OiBbLTFdWyAwXVsrMV1cbiAgICAgKi9cbiAgICByZXR1cm4gaXRlcmF0aW9uICUgMyAtIDE7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBpc0RpYWdvbmFsKFxuICAgIHRpbGU6IE5hdmlnYXRvclRpbGUsXG4gICAgY2hlY2tUaWxlOiBOYXZpZ2F0b3JUaWxlXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aWxlLnBvc2l0aW9uLnggIT09IGNoZWNrVGlsZS5wb3NpdGlvbi54ICYmXG4gICAgICB0aWxlLnBvc2l0aW9uLnkgIT09IGNoZWNrVGlsZS5wb3NpdGlvbi55XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UGFyZW50KFxuICAgIHRpbGU6IE5hdmlnYXRvclRpbGUsXG4gICAgY2hlY2tUaWxlOiBOYXZpZ2F0b3JUaWxlXG4gICk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBjb25zdCB0aWxlTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IHRpbGUuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICBjb25zdCBjaGVja05hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSBjaGVja1RpbGUuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcblxuICAgIGlmICghY2hlY2tOYXZEYXRhLnBhcmVudCkge1xuICAgICAgY2hlY2tOYXZEYXRhLnBhcmVudCA9IHRpbGU7XG4gICAgICByZXR1cm4gdGlsZTtcbiAgICB9XG5cbiAgICBjb25zdCBtb3ZlQ29zdCA9IE5hdmlnYXRvci5pc0RpYWdvbmFsKHRpbGUsIGNoZWNrVGlsZSlcbiAgICAgID8gdGhpcy5kaWFnb25hbENvc3RcbiAgICAgIDogdGhpcy52ZXJ0aWNhbENvc3Q7XG5cbiAgICBpZiAodGlsZU5hdkRhdGEuZ1ZhbCArIG1vdmVDb3N0IDwgY2hlY2tOYXZEYXRhLmdWYWwpIHtcbiAgICAgIGNoZWNrTmF2RGF0YS5wYXJlbnQgPSB0aWxlO1xuICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGNob29zZU5leHQoKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIHRoaXMub3BlbiA9IHRoaXMub3Blbi5zb3J0KChhOiBOYXZpZ2F0b3JUaWxlLCBiOiBOYXZpZ2F0b3JUaWxlKSA9PiB7XG4gICAgICBjb25zdCBhTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGEuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgIGNvbnN0IGJOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gYi5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgICAgcmV0dXJuIGFOYXZEYXRhLmZWYWwgLSBiTmF2RGF0YS5mVmFsO1xuICAgIH0pO1xuICAgIGNvbnN0IG5leHQ6IE5hdmlnYXRvclRpbGUgfCB1bmRlZmluZWQgPSB0aGlzLm9wZW5bMF07XG5cbiAgICBpZiAoIW5leHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMub3Blbi5zaGlmdCgpO1xuICAgIHRoaXMuY2xvc2VkLnB1c2gobmV4dCk7XG5cbiAgICBpZiAobmV4dC5pZCA9PT0gdGhpcy5lbmQuaWQpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuZW5kO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cblxuICBwcml2YXRlIGdldFBhdGgoKTogTmF2aWdhdG9yVGlsZVtdIHtcbiAgICB0aGlzLl9wYXRoID0gW107XG4gICAgbGV0IHsgY3VycmVudCB9ID0gdGhpcztcblxuICAgIHdoaWxlIChjdXJyZW50LmlkICE9PSB0aGlzLmJlZ2luLmlkKSB7XG4gICAgICBjb25zdCBjdXJyZW50TmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGN1cnJlbnQuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgIHRoaXMuX3BhdGgucHVzaChjdXJyZW50KTtcblxuICAgICAgaWYgKGN1cnJlbnROYXZEYXRhLnBhcmVudCkge1xuICAgICAgICBjdXJyZW50ID0gY3VycmVudE5hdkRhdGEucGFyZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fcGF0aC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0T25Db21wbGV0ZShwYXRoOiBOYXZpZ2F0b3JUaWxlW10pIHtcbiAgICBjb25zb2xlLmxvZyhwYXRoKTtcbiAgfVxufVxuIiwiaW1wb3J0IE5hdmlnYXRvciBmcm9tICcuL05hdmlnYXRvcic7XG5pbXBvcnQgaWQgZnJvbSAnLi4vaW50ZXJmYWNlcy9pZCc7XG5pbXBvcnQgdW5pcXVlSUQgZnJvbSAnLi4vdXRpbC91bmlxdWVJRCc7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0b3JEYXRhIGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSUQoKTtcbiAgZ1ZhbDogbnVtYmVyOyAvLyBkaXN0YW5jZSBmcm9tIHN0YXJ0XG4gIGhWYWw6IG51bWJlcjsgLy8gZGlzdGFuY2UgZnJvbSBlbmRcbiAgZlZhbDogbnVtYmVyOyAvLyBnQ29zdCArIGhDb3N0XG4gIHBhcmVudDogTmF2aWdhdG9yVGlsZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbmF2aWdhdG9yOiBOYXZpZ2F0b3IpIHt9XG59XG4iLCJpbXBvcnQgaWQgZnJvbSAnLi4vaW50ZXJmYWNlcy9pZCc7XG5pbXBvcnQgdW5pcXVlSWQgZnJvbSAnLi4vdXRpbC91bmlxdWVJRCc7XG5pbXBvcnQgcG9pbnQgZnJvbSAnLi4vaW50ZXJmYWNlcy9wb2ludCc7XG5pbXBvcnQgTmF2aWdhdG9yIGZyb20gJy4vTmF2aWdhdG9yJztcbmltcG9ydCB7IGNvbnRhaW5zIH0gZnJvbSAnLi4vdXRpbC9pZCc7XG5pbXBvcnQgTmF2aWdhdG9yRGF0YSBmcm9tICcuL05hdmlnYXRvckRhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0b3JUaWxlIGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSWQoKTtcbiAgaXNPYnN0YWNsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIG5hdmlnYXRvcnM6IE5hdmlnYXRvckRhdGFbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHBvc2l0aW9uOiBwb2ludCkge31cblxuICByZWdpc3Rlck5hdmlnYXRvckRhdGEobmF2aWdhdG9yOiBOYXZpZ2F0b3IpOiBib29sZWFuIHtcbiAgICBjb25zdCBuYXZpZ2F0aW9uRGF0YTogTmF2aWdhdG9yRGF0YSA9IG5ldyBOYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcik7XG5cbiAgICBpZiAoY29udGFpbnModGhpcy5uYXZpZ2F0b3JzLCBuYXZpZ2F0aW9uRGF0YSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLm5hdmlnYXRvcnMucHVzaChuYXZpZ2F0aW9uRGF0YSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXROYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcjogTmF2aWdhdG9yKTogTmF2aWdhdG9yRGF0YSB8IG51bGwge1xuICAgIGNvbnN0IG5hdkRhdGEgPSB0aGlzLm5hdmlnYXRvcnMuZmluZCgobmF2aWdhdGlvbkRhdGE6IE5hdmlnYXRvckRhdGEpID0+IHtcbiAgICAgIHJldHVybiBuYXZpZ2F0aW9uRGF0YS5uYXZpZ2F0b3IuaWQgPT09IG5hdmlnYXRvci5pZDtcbiAgICB9KTtcblxuICAgIHJldHVybiBuYXZEYXRhID8gbmF2RGF0YSA6IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gJy4vR3JpZCc7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IHsgaW50IH0gZnJvbSAnLi4vdXRpbC9yYW5kb20nO1xuaW1wb3J0IHsgY29udGFpbnMsIGZpbmRJbmRleCB9IGZyb20gJy4uL3V0aWwvaWQnO1xuaW1wb3J0IHJvdyBmcm9tICcuLi9pbnRlcmZhY2VzL3Jvdyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic3RhY2xlcyB7XG4gIHByaXZhdGUgcmVhZG9ubHkgb3Blbkxpc3Q6IE5hdmlnYXRvclRpbGVbXSA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IGNsb3NlZExpc3Q6IE5hdmlnYXRvclRpbGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogR3JpZCkge1xuICAgIHRoaXMub3Blbkxpc3QgPSBncmlkLnRpbGVzO1xuICB9XG5cbiAgZ2V0IGxpc3QoKTogTmF2aWdhdG9yVGlsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5jbG9zZWRMaXN0O1xuICB9XG5cbiAgYWRkKHRpbGU6IE5hdmlnYXRvclRpbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlKHRydWUsIHRpbGUpO1xuICB9XG5cbiAgcmVtb3ZlKHRpbGU6IE5hdmlnYXRvclRpbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlKGZhbHNlLCB0aWxlKTtcbiAgfVxuXG4gIGFkZFJhbmRvbShjb3VudDogbnVtYmVyID0gMSk6IE5hdmlnYXRvclRpbGUgfCByb3cgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTXVsdGlwbGVSYW5kb20odHJ1ZSwgY291bnQpO1xuICB9XG5cbiAgcmVtb3ZlUmFuZG9tKGNvdW50OiBudW1iZXIgPSAxKTogTmF2aWdhdG9yVGlsZSB8IHJvdyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVNdWx0aXBsZVJhbmRvbShmYWxzZSwgY291bnQpO1xuICB9XG5cbiAgZ2V0UmFuZG9tT3BlbigpOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmFuZG9tKHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSYW5kb20ob3BlbjogYm9vbGVhbik6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBjb25zdCBsaXN0ID0gb3BlbiA/IHRoaXMub3Blbkxpc3QgOiB0aGlzLmNsb3NlZExpc3Q7XG4gICAgY29uc3QgcmFuZG9tOiBudW1iZXIgPSBpbnQoMCwgbGlzdC5sZW5ndGggLSAxKTtcbiAgICBjb25zdCB0aWxlID0gbGlzdFtyYW5kb21dO1xuICAgIHJldHVybiB0aWxlID8gdGlsZSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1hbmlwdWxhdGVNdWx0aXBsZVJhbmRvbShcbiAgICBhZGQ6IGJvb2xlYW4sXG4gICAgY291bnQ6IG51bWJlclxuICApOiBOYXZpZ2F0b3JUaWxlIHwgcm93IHwgbnVsbCB7XG4gICAgY29uc3QgdGlsZXM6IHJvdyA9IFtdO1xuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRpbGU6IE5hdmlnYXRvclRpbGUgPSB0aGlzLm1hbmlwdWxhdGVTaW5nbGVSYW5kb20oYWRkKTtcbiAgICAgICAgdGlsZXMucHVzaCh0aWxlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvdW50ID09PSAxID8gdGlsZXNbMF0gOiB0aWxlcztcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgbWFuaXB1bGF0ZVNpbmdsZVJhbmRvbShhZGQ6IGJvb2xlYW4pOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3QgdGlsZSA9IHRoaXMuZ2V0UmFuZG9tKGFkZCk7XG5cbiAgICBpZiAodGlsZSkge1xuICAgICAgdGhpcy5tYW5pcHVsYXRlKGFkZCwgdGlsZSk7XG4gICAgICByZXR1cm4gdGlsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgbWFuaXB1bGF0ZShhZGQ6IGJvb2xlYW4sIHRpbGU6IE5hdmlnYXRvclRpbGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBpc0ludmFsaWQ6IGJvb2xlYW4gPSBhZGQgPyB0aWxlLmlzT2JzdGFjbGUgOiAhdGlsZS5pc09ic3RhY2xlO1xuXG4gICAgaWYgKGlzSW52YWxpZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBsaXN0OiBOYXZpZ2F0b3JUaWxlW107XG4gICAgbGV0IG90aGVyTGlzdDogTmF2aWdhdG9yVGlsZVtdO1xuXG4gICAgaWYgKGFkZCkge1xuICAgICAgbGlzdCA9IHRoaXMub3Blbkxpc3Q7XG4gICAgICBvdGhlckxpc3QgPSB0aGlzLmNsb3NlZExpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QgPSB0aGlzLmNsb3NlZExpc3Q7XG4gICAgICBvdGhlckxpc3QgPSB0aGlzLm9wZW5MaXN0O1xuICAgIH1cblxuICAgIGlmIChjb250YWlucyhsaXN0LCB0aWxlKSkge1xuICAgICAgdGlsZS5pc09ic3RhY2xlID0gYWRkO1xuICAgICAgY29uc3QgaW5kZXggPSBmaW5kSW5kZXgobGlzdCwgdGlsZSk7XG4gICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICBvdGhlckxpc3QucHVzaCh0aWxlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSAnLi9jbGFzc2VzL0dyaWQnO1xuaW1wb3J0IE5hdmlnYXRvciBmcm9tICcuL2NsYXNzZXMvTmF2aWdhdG9yJztcbmltcG9ydCBOYXZpZ2F0b3JUaWxlIGZyb20gJy4vY2xhc3Nlcy9OYXZpZ2F0b3JUaWxlJztcblxuZXhwb3J0IHsgR3JpZCwgTmF2aWdhdG9yLCBOYXZpZ2F0b3JUaWxlIH07XG4iLCJpbXBvcnQgaWQgZnJvbSAnLi4vaW50ZXJmYWNlcy9pZCc7XG5cbmNvbnN0IGNvbnRhaW5zID0gKGFycmF5OiBpZFtdLCBlbGVtZW50OiBpZCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gZmluZEluZGV4KGFycmF5LCBlbGVtZW50KSAhPT0gLTE7XG59O1xuXG5jb25zdCBmaW5kSW5kZXggPSAoYXJyYXk6IGlkW10sIGZpbmQ6IGlkKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIGFycmF5LmZpbmRJbmRleCgoZWxlbWVudDogaWQpID0+IGVsZW1lbnQuaWQgPT09IGZpbmQuaWQpO1xufTtcblxuZXhwb3J0IHsgY29udGFpbnMsIGZpbmRJbmRleCB9O1xuIiwiY29uc3QgaW50ID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLnJvdW5kKGZsb2F0KG1pbiwgbWF4KSk7XG59O1xuXG5jb25zdCBmbG9hdCA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xufTtcblxuY29uc3QgY29sb3I9ICgpID0+IHtcbiAgY29uc3QgciA9IGludCgwLCAyNTUpO1xuICBjb25zdCBnID0gMDsvL2ludCgwLCAyNTUpO1xuICBjb25zdCBiID0gMDsvL2ludCgwLCAyNTUpO1xuICByZXR1cm4gYHJnYigke3J9LCR7Z30sJHtifSlgO1xufTtcblxuZXhwb3J0IHsgaW50LCBmbG9hdCwgY29sb3IgfTtcbiIsImxldCBpZCA9IDA7XG5cbmNvbnN0IHVuaXF1ZUlkID0gKCk6IG51bWJlciA9PiBpZCsrO1xuXG5leHBvcnQgZGVmYXVsdCB1bmlxdWVJZDtcbiJdLCJzb3VyY2VSb290IjoiIn0=