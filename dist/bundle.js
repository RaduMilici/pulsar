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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Grid; });
/* harmony import */ var _NavigatorTile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NavigatorTile */ "./src/classes/NavigatorTile.ts");
/* harmony import */ var _util_random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/random */ "./src/util/random.ts");
/* harmony import */ var _Obstacles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Obstacles */ "./src/classes/Obstacles.ts");



const defaultSize = { width: 10, height: 10 };
class Grid {
    constructor(size = defaultSize) {
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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Grid, Navigator, NavigatorTile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Grid */ "./src/classes/Grid.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return _classes_Grid__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _classes_Navigator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Navigator */ "./src/classes/Navigator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navigator", function() { return _classes_Navigator__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _classes_NavigatorTile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/NavigatorTile */ "./src/classes/NavigatorTile.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavigatorTile", function() { return _classes_NavigatorTile__WEBPACK_IMPORTED_MODULE_2__["default"]; });







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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9OYXZpZ2F0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTmF2aWdhdG9yRGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9OYXZpZ2F0b3JUaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL09ic3RhY2xlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvcmFuZG9tLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3VuaXF1ZUlELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7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LE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUUyQjs7Ozs7Ozs7Ozs7OztBQ2Y3QjtBQUFBLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUVYLE1BQU0sUUFBUSxHQUFHLEdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBRXBDLCtEQUFlLFFBQVEsRUFBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBOYXZpZ2F0b3JUaWxlIGZyb20gJy4vTmF2aWdhdG9yVGlsZSc7XG5pbXBvcnQgc2l6ZSBmcm9tICcuLi9pbnRlcmZhY2VzL3NpemUnO1xuaW1wb3J0IHBvaW50IGZyb20gJy4uL2ludGVyZmFjZXMvcG9pbnQnO1xuaW1wb3J0IHJvdyBmcm9tICcuLi9pbnRlcmZhY2VzL3Jvdyc7XG5pbXBvcnQgeyBpbnQgfSBmcm9tICcuLi91dGlsL3JhbmRvbSc7XG5pbXBvcnQgT2JzdGFjbGVzIGZyb20gJy4vT2JzdGFjbGVzJztcblxuY29uc3QgZGVmYXVsdFNpemU6IHNpemUgPSB7IHdpZHRoOiAxMCwgaGVpZ2h0OiAxMCB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIHtcbiAgcmVhZG9ubHkgdGlsZXM6IE5hdmlnYXRvclRpbGVbXSA9IFtdO1xuICByZWFkb25seSByb3dzOiByb3dbXSA9IFtdO1xuICBwdWJsaWMgcmVhZG9ubHkgb2JzdGFjbGVzOiBPYnN0YWNsZXMgPSBuZXcgT2JzdGFjbGVzKHRoaXMpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2l6ZTogc2l6ZSA9IGRlZmF1bHRTaXplKSB7XG4gICAgdGhpcy5tYWtlR3JpZCgpO1xuICB9XG5cbiAgcmFuZG9tVGlsZSgpOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3QgeCA9IGludCgwLCB0aGlzLnNpemUud2lkdGggLSAxKTtcbiAgICBjb25zdCB5ID0gaW50KDAsIHRoaXMuc2l6ZS5oZWlnaHQgLSAxKTtcblxuICAgIHJldHVybiB0aGlzLmZpbmRUaWxlKHsgeCwgeSB9KTtcbiAgfVxuXG4gIHJhbmRvbUZyZWVUaWxlKCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5vYnN0YWNsZXMuZ2V0UmFuZG9tT3BlbigpO1xuICB9XG5cbiAgZmluZFRpbGUocG9zaXRpb246IHBvaW50KTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIHJldHVybiBHcmlkLmdldFRpbGUocG9zaXRpb24sIHRoaXMucm93cyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRUaWxlKHsgeCwgeSB9OiBwb2ludCwgbGlzdDogcm93W10pOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3Qgcm93OiByb3cgPSBsaXN0W3ldO1xuICAgIHJldHVybiAocm93ICYmIHJvdy5sZW5ndGggPiB4KSA/IHJvd1t4XSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1ha2VHcmlkKCk6IHZvaWQge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5zaXplLmhlaWdodDsgeSsrKSB7XG4gICAgICBjb25zdCByb3c6IHJvdyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuc2l6ZS53aWR0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IHRpbGU6IE5hdmlnYXRvclRpbGUgPSBuZXcgTmF2aWdhdG9yVGlsZSh7IHgsIHkgfSk7XG4gICAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgcm93LnB1c2godGlsZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IE5hdmlnYXRvckRhdGEgZnJvbSAnLi9OYXZpZ2F0b3JEYXRhJztcbmltcG9ydCByb3cgZnJvbSAnLi4vaW50ZXJmYWNlcy9yb3cnO1xuaW1wb3J0IEdyaWQgZnJvbSAnLi9HcmlkJztcbmltcG9ydCB1bmlxdWVJRCBmcm9tICcuLi91dGlsL3VuaXF1ZUlEJztcbmltcG9ydCBpZCBmcm9tICcuLi9pbnRlcmZhY2VzL2lkJztcbmltcG9ydCB7IGNvbnRhaW5zIH0gZnJvbSAnLi4vdXRpbC9pZCc7XG50eXBlIG9uRXhwbG9yZSA9ICh0aWxlOiBOYXZpZ2F0b3JUaWxlKSA9PiB2b2lkO1xudHlwZSBvbkNvbXBsZXRlID0gKHBhdGg6IE5hdmlnYXRvclRpbGVbXSkgPT4gdm9pZDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdG9yIGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSUQoKTtcbiAgcHJpdmF0ZSBfcGF0aDogcm93ID0gW107XG4gIHByaXZhdGUgdmVydGljYWxDb3N0OiBudW1iZXIgPSAxO1xuICBwcml2YXRlIGRpYWdvbmFsQ29zdDogbnVtYmVyID0gMS40O1xuICBwcml2YXRlIG5laWdoYm9yc0NvdW50OiBudW1iZXIgPSA5O1xuICBwcml2YXRlIHRpbGVzOiByb3cgPSBbXTtcbiAgcHJpdmF0ZSBvcGVuOiByb3cgPSBbXTtcbiAgcHJpdmF0ZSBjbG9zZWQ6IHJvdyA9IFtdO1xuICBwcml2YXRlIGN1cnJlbnQ6IE5hdmlnYXRvclRpbGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBncmlkOiBHcmlkLFxuICAgIHByaXZhdGUgYmVnaW46IE5hdmlnYXRvclRpbGUsXG4gICAgcHJpdmF0ZSBlbmQ6IE5hdmlnYXRvclRpbGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkV4cGxvcmU6IG9uRXhwbG9yZSA9ICgpID0+IHt9LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgb25Db21wbGV0ZTogb25Db21wbGV0ZSA9IE5hdmlnYXRvci5kZWZhdWx0T25Db21wbGV0ZVxuICApIHt9XG5cbiAgZ2V0IHBhdGgoKTogcm93IHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aDtcbiAgfVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuYWRkT3BlblRpbGVzKHRoaXMuZ3JpZCk7XG4gICAgdGhpcy5jYWxjdWxhdGVIKCk7XG4gICAgdGhpcy5jbG9zZWQucHVzaCh0aGlzLmJlZ2luKTtcbiAgICBjb25zdCBiZWdpbk5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSB0aGlzLmJlZ2luLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgYmVnaW5OYXZEYXRhLmdWYWwgPSAwO1xuICAgIHRoaXMuY2FsY3VsYXRlRyh0aGlzLmJlZ2luKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkT3BlblRpbGVzKGdyaWQ6IEdyaWQpOiB2b2lkIHtcbiAgICBncmlkLnJvd3MuZm9yRWFjaCgocm93OiByb3cpID0+IHtcbiAgICAgIGNvbnN0IG5hdmlnYXRvclRpbGVzOiBOYXZpZ2F0b3JUaWxlW10gPSByb3cubWFwKCh0aWxlOiBOYXZpZ2F0b3JUaWxlKSA9PiB7XG4gICAgICAgIHRpbGUucmVnaXN0ZXJOYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGlsZTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy50aWxlcyA9IHRoaXMudGlsZXMuY29uY2F0KG5hdmlnYXRvclRpbGVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlSCgpOiB2b2lkIHtcbiAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGU6IE5hdmlnYXRvclRpbGUpID0+IHtcbiAgICAgIC8vIG1hbmhhdHRhbiBkaXN0YW5jZVxuICAgICAgY29uc3QgbmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IHRpbGUuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgIGNvbnN0IGNvbFZhbDogbnVtYmVyID0gTWF0aC5hYnModGlsZS5wb3NpdGlvbi54IC0gdGhpcy5lbmQucG9zaXRpb24ueCk7XG4gICAgICBjb25zdCByb3dWYWw6IG51bWJlciA9IE1hdGguYWJzKHRpbGUucG9zaXRpb24ueSAtIHRoaXMuZW5kLnBvc2l0aW9uLnkpO1xuICAgICAgbmF2RGF0YS5oVmFsID0gY29sVmFsICsgcm93VmFsO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVHKHRpbGU6IE5hdmlnYXRvclRpbGUpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnQgPSB0aWxlO1xuICAgIGNvbnN0IHRpbGVOYXZEYXRhID0gdGlsZS5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5laWdoYm9yc0NvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IHg6IG51bWJlciA9IHRpbGUucG9zaXRpb24ueCArIE5hdmlnYXRvci5nZXRDb2xPZmZzZXQoaSk7XG4gICAgICBjb25zdCB5OiBudW1iZXIgPSB0aWxlLnBvc2l0aW9uLnkgKyB0aGlzLmdldFJvd09mZnNldChpKTtcbiAgICAgIGNvbnN0IGV4cGxvcmluZzogTmF2aWdhdG9yVGlsZSB8IG51bGwgPSB0aGlzLmdyaWQuZmluZFRpbGUoeyB4LCB5IH0pO1xuXG4gICAgICBpZiAoIWV4cGxvcmluZykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhwbG9yaW5nTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGV4cGxvcmluZy5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuXG4gICAgICBpZiAoZXhwbG9yaW5nLmlzT2JzdGFjbGUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb250YWlucyh0aGlzLmNsb3NlZCwgZXhwbG9yaW5nKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRpbGUuaWQgPT09IGV4cGxvcmluZy5pZCkge1xuICAgICAgICB0aGlzLmNsb3NlZC5wdXNoKGV4cGxvcmluZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuZ2V0UGFyZW50KHRpbGUsIGV4cGxvcmluZykpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY29udGFpbnModGhpcy5vcGVuLCBleHBsb3JpbmcpKSB7XG4gICAgICAgICAgdGhpcy5vcGVuLnB1c2goZXhwbG9yaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChOYXZpZ2F0b3IuaXNEaWFnb25hbCh0aWxlLCBleHBsb3JpbmcpKSB7XG4gICAgICAgICAgZXhwbG9yaW5nTmF2RGF0YS5nVmFsID0gdGlsZU5hdkRhdGEuZ1ZhbCArIHRoaXMuZGlhZ29uYWxDb3N0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmluZ05hdkRhdGEuZ1ZhbCA9IHRpbGVOYXZEYXRhLmdWYWwgKyB0aGlzLnZlcnRpY2FsQ29zdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBleHBsb3JpbmdOYXZEYXRhLmZWYWwgPSB0aGlzLmNhbGN1bGF0ZUYoZXhwbG9yaW5nKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0ID0gdGhpcy5jaG9vc2VOZXh0KCk7XG5cbiAgICBpZiAobmV4dCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgdGhpcy5vbkV4cGxvcmUobmV4dCk7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRyhuZXh0KTtcbiAgICAgIH0sIDEwKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXRoOiBOYXZpZ2F0b3JUaWxlW10gPSB0aGlzLmdldFBhdGgoKTtcbiAgICAgIHRoaXMub25Db21wbGV0ZShwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUYodGlsZTogTmF2aWdhdG9yVGlsZSk6IG51bWJlciB7XG4gICAgY29uc3QgeyBnVmFsLCBoVmFsIH06IE5hdmlnYXRvckRhdGEgPSB0aWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgcmV0dXJuIGdWYWwgKyBoVmFsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSb3dPZmZzZXQoaXRlcmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIC8qXG4gICAgICAgaXRlcmF0aW9uID0gMCwgMSwgb3IgMjogWy0xXVstMV1bLTFdXG4gICAgICAgaXRlcmF0aW9uID0gMywgNCwgb3IgNTogWyAwXVsgMF1bIDBdXG4gICAgICAgaXRlcmF0aW9uID0gNiwgNywgb3IgODogWysxXVsrMV1bKzFdXG4gICAgICovXG4gICAgcmV0dXJuIHRoaXMubmVpZ2hib3JzQ291bnQgKyAtTWF0aC5mbG9vcigoMzIgLSBpdGVyYXRpb24pIC8gMyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRDb2xPZmZzZXQoaXRlcmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIC8qXG4gICAgICAgaXRlcmF0aW9uID0gMCwgMSwgb3IgMjogWy0xXVsgMF1bKzFdXG4gICAgICAgaXRlcmF0aW9uID0gMywgNCwgb3IgNTogWy0xXVsgMF1bKzFdXG4gICAgICAgaXRlcmF0aW9uID0gNiwgNywgb3IgODogWy0xXVsgMF1bKzFdXG4gICAgICovXG4gICAgcmV0dXJuIGl0ZXJhdGlvbiAlIDMgLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNEaWFnb25hbChcbiAgICB0aWxlOiBOYXZpZ2F0b3JUaWxlLFxuICAgIGNoZWNrVGlsZTogTmF2aWdhdG9yVGlsZVxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGlsZS5wb3NpdGlvbi54ICE9PSBjaGVja1RpbGUucG9zaXRpb24ueCAmJlxuICAgICAgdGlsZS5wb3NpdGlvbi55ICE9PSBjaGVja1RpbGUucG9zaXRpb24ueVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldFBhcmVudChcbiAgICB0aWxlOiBOYXZpZ2F0b3JUaWxlLFxuICAgIGNoZWNrVGlsZTogTmF2aWdhdG9yVGlsZVxuICApOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3QgdGlsZU5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSB0aWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgY29uc3QgY2hlY2tOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gY2hlY2tUaWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG5cbiAgICBpZiAoIWNoZWNrTmF2RGF0YS5wYXJlbnQpIHtcbiAgICAgIGNoZWNrTmF2RGF0YS5wYXJlbnQgPSB0aWxlO1xuICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfVxuXG4gICAgY29uc3QgbW92ZUNvc3QgPSBOYXZpZ2F0b3IuaXNEaWFnb25hbCh0aWxlLCBjaGVja1RpbGUpXG4gICAgICA/IHRoaXMuZGlhZ29uYWxDb3N0XG4gICAgICA6IHRoaXMudmVydGljYWxDb3N0O1xuXG4gICAgaWYgKHRpbGVOYXZEYXRhLmdWYWwgKyBtb3ZlQ29zdCA8IGNoZWNrTmF2RGF0YS5nVmFsKSB7XG4gICAgICBjaGVja05hdkRhdGEucGFyZW50ID0gdGlsZTtcbiAgICAgIHJldHVybiB0aWxlO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBjaG9vc2VOZXh0KCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICB0aGlzLm9wZW4gPSB0aGlzLm9wZW4uc29ydCgoYTogTmF2aWdhdG9yVGlsZSwgYjogTmF2aWdhdG9yVGlsZSkgPT4ge1xuICAgICAgY29uc3QgYU5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSBhLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgICBjb25zdCBiTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGIuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgIHJldHVybiBhTmF2RGF0YS5mVmFsIC0gYk5hdkRhdGEuZlZhbDtcbiAgICB9KTtcbiAgICBjb25zdCBuZXh0OiBOYXZpZ2F0b3JUaWxlIHwgdW5kZWZpbmVkID0gdGhpcy5vcGVuWzBdO1xuXG4gICAgaWYgKCFuZXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW4uc2hpZnQoKTtcbiAgICB0aGlzLmNsb3NlZC5wdXNoKG5leHQpO1xuXG4gICAgaWYgKG5leHQuaWQgPT09IHRoaXMuZW5kLmlkKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmVuZDtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXRoKCk6IE5hdmlnYXRvclRpbGVbXSB7XG4gICAgdGhpcy5fcGF0aCA9IFtdO1xuICAgIGxldCB7IGN1cnJlbnQgfSA9IHRoaXM7XG5cbiAgICB3aGlsZSAoY3VycmVudC5pZCAhPT0gdGhpcy5iZWdpbi5pZCkge1xuICAgICAgY29uc3QgY3VycmVudE5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSBjdXJyZW50LmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgICB0aGlzLl9wYXRoLnB1c2goY3VycmVudCk7XG5cbiAgICAgIGlmIChjdXJyZW50TmF2RGF0YS5wYXJlbnQpIHtcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnROYXZEYXRhLnBhcmVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3BhdGgucmV2ZXJzZSgpO1xuICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZGVmYXVsdE9uQ29tcGxldGUocGF0aDogTmF2aWdhdG9yVGlsZVtdKSB7XG4gICAgY29uc29sZS5sb2cocGF0aCk7XG4gIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0b3IgZnJvbSAnLi9OYXZpZ2F0b3InO1xuaW1wb3J0IGlkIGZyb20gJy4uL2ludGVyZmFjZXMvaWQnO1xuaW1wb3J0IHVuaXF1ZUlEIGZyb20gJy4uL3V0aWwvdW5pcXVlSUQnO1xuaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9OYXZpZ2F0b3JUaWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdG9yRGF0YSBpbXBsZW1lbnRzIGlkIHtcbiAgaWQ6IG51bWJlciA9IHVuaXF1ZUlEKCk7XG4gIGdWYWw6IG51bWJlcjsgLy8gZGlzdGFuY2UgZnJvbSBzdGFydFxuICBoVmFsOiBudW1iZXI7IC8vIGRpc3RhbmNlIGZyb20gZW5kXG4gIGZWYWw6IG51bWJlcjsgLy8gZ0Nvc3QgKyBoQ29zdFxuICBwYXJlbnQ6IE5hdmlnYXRvclRpbGU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG5hdmlnYXRvcjogTmF2aWdhdG9yKSB7fVxufVxuIiwiaW1wb3J0IGlkIGZyb20gJy4uL2ludGVyZmFjZXMvaWQnO1xuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJy4uL3V0aWwvdW5pcXVlSUQnO1xuaW1wb3J0IHBvaW50IGZyb20gJy4uL2ludGVyZmFjZXMvcG9pbnQnO1xuaW1wb3J0IE5hdmlnYXRvciBmcm9tICcuL05hdmlnYXRvcic7XG5pbXBvcnQgeyBjb250YWlucyB9IGZyb20gJy4uL3V0aWwvaWQnO1xuaW1wb3J0IE5hdmlnYXRvckRhdGEgZnJvbSAnLi9OYXZpZ2F0b3JEYXRhJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdG9yVGlsZSBpbXBsZW1lbnRzIGlkIHtcbiAgaWQ6IG51bWJlciA9IHVuaXF1ZUlkKCk7XG4gIGlzT2JzdGFjbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBuYXZpZ2F0b3JzOiBOYXZpZ2F0b3JEYXRhW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihyZWFkb25seSBwb3NpdGlvbjogcG9pbnQpIHt9XG5cbiAgcmVnaXN0ZXJOYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcjogTmF2aWdhdG9yKTogYm9vbGVhbiB7XG4gICAgY29uc3QgbmF2aWdhdGlvbkRhdGE6IE5hdmlnYXRvckRhdGEgPSBuZXcgTmF2aWdhdG9yRGF0YShuYXZpZ2F0b3IpO1xuXG4gICAgaWYgKGNvbnRhaW5zKHRoaXMubmF2aWdhdG9ycywgbmF2aWdhdGlvbkRhdGEpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5uYXZpZ2F0b3JzLnB1c2gobmF2aWdhdGlvbkRhdGEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0TmF2aWdhdG9yRGF0YShuYXZpZ2F0b3I6IE5hdmlnYXRvcik6IE5hdmlnYXRvckRhdGEgfCBudWxsIHtcbiAgICBjb25zdCBuYXZEYXRhID0gdGhpcy5uYXZpZ2F0b3JzLmZpbmQoKG5hdmlnYXRpb25EYXRhOiBOYXZpZ2F0b3JEYXRhKSA9PiB7XG4gICAgICByZXR1cm4gbmF2aWdhdGlvbkRhdGEubmF2aWdhdG9yLmlkID09PSBuYXZpZ2F0b3IuaWQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmF2RGF0YSA/IG5hdkRhdGEgOiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgR3JpZCBmcm9tICcuL0dyaWQnO1xuaW1wb3J0IE5hdmlnYXRvclRpbGUgZnJvbSAnLi9OYXZpZ2F0b3JUaWxlJztcbmltcG9ydCB7IGludCB9IGZyb20gJy4uL3V0aWwvcmFuZG9tJztcbmltcG9ydCB7IGNvbnRhaW5zLCBmaW5kSW5kZXggfSBmcm9tICcuLi91dGlsL2lkJztcbmltcG9ydCByb3cgZnJvbSAnLi4vaW50ZXJmYWNlcy9yb3cnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnN0YWNsZXMge1xuICBwcml2YXRlIHJlYWRvbmx5IG9wZW5MaXN0OiBOYXZpZ2F0b3JUaWxlW10gPSBbXTtcbiAgcHJpdmF0ZSByZWFkb25seSBjbG9zZWRMaXN0OiBOYXZpZ2F0b3JUaWxlW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IEdyaWQpIHtcbiAgICB0aGlzLm9wZW5MaXN0ID0gZ3JpZC50aWxlcztcbiAgfVxuXG4gIGdldCBsaXN0KCk6IE5hdmlnYXRvclRpbGVbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvc2VkTGlzdDtcbiAgfVxuXG4gIGFkZCh0aWxlOiBOYXZpZ2F0b3JUaWxlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZSh0cnVlLCB0aWxlKTtcbiAgfVxuXG4gIHJlbW92ZSh0aWxlOiBOYXZpZ2F0b3JUaWxlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZShmYWxzZSwgdGlsZSk7XG4gIH1cblxuICBhZGRSYW5kb20oY291bnQ6IG51bWJlciA9IDEpOiBOYXZpZ2F0b3JUaWxlIHwgcm93IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZU11bHRpcGxlUmFuZG9tKHRydWUsIGNvdW50KTtcbiAgfVxuXG4gIHJlbW92ZVJhbmRvbShjb3VudDogbnVtYmVyID0gMSk6IE5hdmlnYXRvclRpbGUgfCByb3cgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTXVsdGlwbGVSYW5kb20oZmFsc2UsIGNvdW50KTtcbiAgfVxuXG4gIGdldFJhbmRvbU9wZW4oKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmdldFJhbmRvbSh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmFuZG9tKG9wZW46IGJvb2xlYW4pOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3QgbGlzdCA9IG9wZW4gPyB0aGlzLm9wZW5MaXN0IDogdGhpcy5jbG9zZWRMaXN0O1xuICAgIGNvbnN0IHJhbmRvbTogbnVtYmVyID0gaW50KDAsIGxpc3QubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgdGlsZSA9IGxpc3RbcmFuZG9tXTtcbiAgICByZXR1cm4gdGlsZSA/IHRpbGUgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBtYW5pcHVsYXRlTXVsdGlwbGVSYW5kb20oXG4gICAgYWRkOiBib29sZWFuLFxuICAgIGNvdW50OiBudW1iZXJcbiAgKTogTmF2aWdhdG9yVGlsZSB8IHJvdyB8IG51bGwge1xuICAgIGNvbnN0IHRpbGVzOiByb3cgPSBbXTtcblxuICAgIGlmIChjb3VudCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICBjb25zdCB0aWxlOiBOYXZpZ2F0b3JUaWxlID0gdGhpcy5tYW5pcHVsYXRlU2luZ2xlUmFuZG9tKGFkZCk7XG4gICAgICAgIHRpbGVzLnB1c2godGlsZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb3VudCA9PT0gMSA/IHRpbGVzWzBdIDogdGlsZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1hbmlwdWxhdGVTaW5nbGVSYW5kb20oYWRkOiBib29sZWFuKTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIGNvbnN0IHRpbGUgPSB0aGlzLmdldFJhbmRvbShhZGQpO1xuXG4gICAgaWYgKHRpbGUpIHtcbiAgICAgIHRoaXMubWFuaXB1bGF0ZShhZGQsIHRpbGUpO1xuICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1hbmlwdWxhdGUoYWRkOiBib29sZWFuLCB0aWxlOiBOYXZpZ2F0b3JUaWxlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaXNJbnZhbGlkOiBib29sZWFuID0gYWRkID8gdGlsZS5pc09ic3RhY2xlIDogIXRpbGUuaXNPYnN0YWNsZTtcblxuICAgIGlmIChpc0ludmFsaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbGlzdDogTmF2aWdhdG9yVGlsZVtdO1xuICAgIGxldCBvdGhlckxpc3Q6IE5hdmlnYXRvclRpbGVbXTtcblxuICAgIGlmIChhZGQpIHtcbiAgICAgIGxpc3QgPSB0aGlzLm9wZW5MaXN0O1xuICAgICAgb3RoZXJMaXN0ID0gdGhpcy5jbG9zZWRMaXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0ID0gdGhpcy5jbG9zZWRMaXN0O1xuICAgICAgb3RoZXJMaXN0ID0gdGhpcy5vcGVuTGlzdDtcbiAgICB9XG5cbiAgICBpZiAoY29udGFpbnMobGlzdCwgdGlsZSkpIHtcbiAgICAgIHRpbGUuaXNPYnN0YWNsZSA9IGFkZDtcbiAgICAgIGNvbnN0IGluZGV4ID0gZmluZEluZGV4KGxpc3QsIHRpbGUpO1xuICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgb3RoZXJMaXN0LnB1c2godGlsZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gJy4vY2xhc3Nlcy9HcmlkJztcbmltcG9ydCBOYXZpZ2F0b3IgZnJvbSAnLi9jbGFzc2VzL05hdmlnYXRvcic7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL2NsYXNzZXMvTmF2aWdhdG9yVGlsZSc7XG5cbmV4cG9ydCB7IEdyaWQsIE5hdmlnYXRvciwgTmF2aWdhdG9yVGlsZSB9O1xuIiwiaW1wb3J0IGlkIGZyb20gJy4uL2ludGVyZmFjZXMvaWQnO1xuXG5jb25zdCBjb250YWlucyA9IChhcnJheTogaWRbXSwgZWxlbWVudDogaWQpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGZpbmRJbmRleChhcnJheSwgZWxlbWVudCkgIT09IC0xO1xufTtcblxuY29uc3QgZmluZEluZGV4ID0gKGFycmF5OiBpZFtdLCBmaW5kOiBpZCk6IG51bWJlciA9PiB7XG4gIHJldHVybiBhcnJheS5maW5kSW5kZXgoKGVsZW1lbnQ6IGlkKSA9PiBlbGVtZW50LmlkID09PSBmaW5kLmlkKTtcbn07XG5cbmV4cG9ydCB7IGNvbnRhaW5zLCBmaW5kSW5kZXggfTtcbiIsImNvbnN0IGludCA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTWF0aC5yb3VuZChmbG9hdChtaW4sIG1heCkpO1xufTtcblxuY29uc3QgZmxvYXQgPSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbn07XG5cbmNvbnN0IGNvbG9yPSAoKSA9PiB7XG4gIGNvbnN0IHIgPSBpbnQoMCwgMjU1KTtcbiAgY29uc3QgZyA9IDA7Ly9pbnQoMCwgMjU1KTtcbiAgY29uc3QgYiA9IDA7Ly9pbnQoMCwgMjU1KTtcbiAgcmV0dXJuIGByZ2IoJHtyfSwke2d9LCR7Yn0pYDtcbn07XG5cbmV4cG9ydCB7IGludCwgZmxvYXQsIGNvbG9yIH07XG4iLCJsZXQgaWQgPSAwO1xuXG5jb25zdCB1bmlxdWVJZCA9ICgpOiBudW1iZXIgPT4gaWQrKztcblxuZXhwb3J0IGRlZmF1bHQgdW5pcXVlSWQ7XG4iXSwic291cmNlUm9vdCI6IiJ9