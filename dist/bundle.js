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
            this.onExplore(next);
            this.calculateG(next);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvR3JpZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9OYXZpZ2F0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTmF2aWdhdG9yRGF0YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9OYXZpZ2F0b3JUaWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL09ic3RhY2xlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvcmFuZG9tLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3VuaXF1ZUlELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGNEM7QUFJUDtBQUNEO0FBRXRCO0lBS1osWUFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFKckIsVUFBSyxHQUFvQixFQUFFLENBQUM7UUFDNUIsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUNWLGNBQVMsR0FBYyxJQUFJLGtEQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHekQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxVQUFVO1FBQ1IsTUFBTSxDQUFDLEdBQUcsd0RBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsd0RBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFdkMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVEsQ0FBQyxRQUFlO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBUyxFQUFFLElBQVc7UUFDakQsTUFBTSxHQUFHLEdBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakQsQ0FBQztJQUVPLFFBQVE7UUFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsTUFBTSxHQUFHLEdBQVEsRUFBRSxDQUFDO1lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxJQUFJLEdBQWtCLElBQUksc0RBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdDdUM7QUFFRjtBQUl4QjtJQVVaLFlBQ1UsSUFBVSxFQUNWLEtBQW9CLEVBQ3BCLEdBQWtCLEVBQ1QsWUFBdUIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUMvQixhQUF5QixTQUFTLENBQUMsaUJBQWlCO1FBSjdELFNBQUksR0FBSixJQUFJLENBQU07UUFDVixVQUFLLEdBQUwsS0FBSyxDQUFlO1FBQ3BCLFFBQUcsR0FBSCxHQUFHLENBQWU7UUFDVCxjQUFTLEdBQVQsU0FBUyxDQUFzQjtRQUMvQixlQUFVLEdBQVYsVUFBVSxDQUEwQztRQWR2RSxPQUFFLEdBQVcsOERBQVEsRUFBRSxDQUFDO1FBQ2hCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBQzNCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLFVBQUssR0FBUSxFQUFFLENBQUM7UUFDaEIsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUNmLFdBQU0sR0FBUSxFQUFFLENBQUM7SUFTdEIsQ0FBQztJQUVKLEtBQUs7UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLE1BQU0sWUFBWSxHQUFrQixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RFLFlBQVksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxZQUFZLENBQUMsSUFBVTtRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQzdCLE1BQU0sY0FBYyxHQUFvQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBbUIsRUFBRSxFQUFFO2dCQUN0RSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFtQixFQUFFLEVBQUU7WUFDekMscUJBQXFCO1lBQ3JCLE1BQU0sT0FBTyxHQUFrQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsTUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RSxNQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxVQUFVLENBQUMsSUFBbUI7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLE1BQU0sQ0FBQyxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsTUFBTSxDQUFDLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLFNBQVMsR0FBeUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVyRSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLFNBQVM7YUFDVjtZQUVELE1BQU0sZ0JBQWdCLEdBQWtCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV6RSxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hCLFNBQVM7YUFDVjtZQUVELElBQUkseURBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUNwQyxTQUFTO2FBQ1Y7WUFFRCxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFFO29CQUNwQyxTQUFTO2lCQUNWO2dCQUVELElBQUksQ0FBQyx5REFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMzQjtnQkFFRCxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFFO29CQUN6QyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2lCQUM5RDtxQkFBTTtvQkFDTCxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2lCQUM5RDthQUNGO1lBRUQsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFL0IsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNMLE1BQU0sSUFBSSxHQUFvQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFTyxVQUFVLENBQUMsSUFBbUI7UUFDcEMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBa0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU8sWUFBWSxDQUFDLFNBQWlCO1FBQ3BDOzs7O1dBSUc7UUFDSCxPQUFPLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFTyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQWlCO1FBQzNDOzs7O1dBSUc7UUFDSCxPQUFPLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxNQUFNLENBQUMsVUFBVSxDQUN2QixJQUFtQixFQUNuQixTQUF3QjtRQUV4QixPQUFPLENBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUVPLFNBQVMsQ0FDZixJQUFtQixFQUNuQixTQUF3QjtRQUV4QixNQUFNLFdBQVcsR0FBa0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELE1BQU0sWUFBWSxHQUFrQixTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDeEIsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQztZQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVk7WUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFdEIsSUFBSSxXQUFXLENBQUMsSUFBSSxHQUFHLFFBQVEsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQ25ELFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxVQUFVO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFnQixFQUFFLENBQWdCLEVBQUUsRUFBRTtZQUNoRSxNQUFNLFFBQVEsR0FBa0IsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELE1BQU0sUUFBUSxHQUFrQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsT0FBTyxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBOEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN4QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sT0FBTztRQUNiLE1BQU0sSUFBSSxHQUFvQixFQUFFLENBQUM7UUFDakMsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQztRQUV2QixPQUFPLE9BQU8sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxjQUFjLEdBQWtCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRW5CLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRTtnQkFDekIsT0FBTyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsTUFBTTthQUNQO1NBQ0Y7UUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBcUI7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwTnVDO0FBRzFCO0lBT1osWUFBNEIsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQU5oRCxPQUFFLEdBQVcsOERBQVEsRUFBRSxDQUFDO0lBTTJCLENBQUM7Q0FDckQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1p1QztBQUdGO0FBQ007QUFFOUI7SUFLWixZQUFxQixRQUFlO1FBQWYsYUFBUSxHQUFSLFFBQVEsQ0FBTztRQUpwQyxPQUFFLEdBQVcsOERBQVEsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDcEIsZUFBVSxHQUFvQixFQUFFLENBQUM7SUFFRixDQUFDO0lBRXhDLHFCQUFxQixDQUFDLFNBQW9CO1FBQ3hDLE1BQU0sY0FBYyxHQUFrQixJQUFJLHNEQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkUsSUFBSSx5REFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLEVBQUU7WUFDN0MsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGdCQUFnQixDQUFDLFNBQW9CO1FBQ25DLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBNkIsRUFBRSxFQUFFO1lBQ3JFLE9BQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsQyxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJvQztBQUNZO0FBR25DO0lBSVosWUFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFIYixhQUFRLEdBQW9CLEVBQUUsQ0FBQztRQUMvQixlQUFVLEdBQW9CLEVBQUUsQ0FBQztRQUdoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFtQjtRQUN4QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBZ0IsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFlBQVksQ0FBQyxRQUFnQixDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU8sU0FBUyxDQUFDLElBQWE7UUFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3BELE1BQU0sTUFBTSxHQUFXLHdEQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRU8sd0JBQXdCLENBQzlCLEdBQVksRUFDWixLQUFhO1FBRWIsTUFBTSxLQUFLLEdBQVEsRUFBRSxDQUFDO1FBRXRCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlCLE1BQU0sSUFBSSxHQUFrQixJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEI7WUFFRCxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3ZDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sc0JBQXNCLENBQUMsR0FBWTtRQUN6QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpDLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLFVBQVUsQ0FBQyxHQUFZLEVBQUUsSUFBbUI7UUFDbEQsTUFBTSxTQUFTLEdBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFcEUsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQXFCLENBQUM7UUFDMUIsSUFBSSxTQUEwQixDQUFDO1FBRS9CLElBQUksR0FBRyxFQUFFO1lBQ1AsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDckIsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDN0I7YUFBTTtZQUNMLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQzNCO1FBRUQsSUFBSSx5REFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUN0QixNQUFNLEtBQUssR0FBRywwREFBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R2lDO0FBQ1U7QUFDUTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7QUNGMUM7QUFBQSxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQVcsRUFBRSxPQUFXLEVBQVcsRUFBRTtJQUNyRCxPQUFPLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDO0FBRUYsTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFXLEVBQUUsSUFBUSxFQUFVLEVBQUU7SUFDbEQsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBVyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUM7QUFFNkI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWL0I7QUFBQSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQVUsRUFBRTtJQUMvQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBVSxFQUFFO0lBQ2pELE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMzQyxDQUFDLENBQUM7QUFFRixNQUFNLEtBQUssR0FBRSxHQUFHLEVBQUU7SUFDaEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBYztJQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBYztJQUMxQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFFMkI7Ozs7Ozs7Ozs7Ozs7QUNmN0I7QUFBQSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFWCxNQUFNLFFBQVEsR0FBRyxHQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUVwQywrREFBZSxRQUFRLEVBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IHNpemUgZnJvbSAnLi4vaW50ZXJmYWNlcy9zaXplJztcbmltcG9ydCBwb2ludCBmcm9tICcuLi9pbnRlcmZhY2VzL3BvaW50JztcbmltcG9ydCByb3cgZnJvbSAnLi4vaW50ZXJmYWNlcy9yb3cnO1xuaW1wb3J0IHsgaW50IH0gZnJvbSAnLi4vdXRpbC9yYW5kb20nO1xuaW1wb3J0IE9ic3RhY2xlcyBmcm9tICcuL09ic3RhY2xlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQge1xuICByZWFkb25seSB0aWxlczogTmF2aWdhdG9yVGlsZVtdID0gW107XG4gIHJlYWRvbmx5IHJvd3M6IHJvd1tdID0gW107XG4gIHB1YmxpYyByZWFkb25seSBvYnN0YWNsZXM6IE9ic3RhY2xlcyA9IG5ldyBPYnN0YWNsZXModGhpcyk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzaXplOiBzaXplKSB7XG4gICAgdGhpcy5tYWtlR3JpZCgpO1xuICB9XG5cbiAgcmFuZG9tVGlsZSgpOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3QgeCA9IGludCgwLCB0aGlzLnNpemUud2lkdGggLSAxKTtcbiAgICBjb25zdCB5ID0gaW50KDAsIHRoaXMuc2l6ZS5oZWlnaHQgLSAxKTtcblxuICAgIHJldHVybiB0aGlzLmZpbmRUaWxlKHsgeCwgeSB9KTtcbiAgfVxuXG4gIHJhbmRvbUZyZWVUaWxlKCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5vYnN0YWNsZXMuZ2V0UmFuZG9tT3BlbigpO1xuICB9XG5cbiAgZmluZFRpbGUocG9zaXRpb246IHBvaW50KTogTmF2aWdhdG9yVGlsZSB8IG51bGwge1xuICAgIHJldHVybiBHcmlkLmdldFRpbGUocG9zaXRpb24sIHRoaXMucm93cyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRUaWxlKHsgeCwgeSB9OiBwb2ludCwgbGlzdDogcm93W10pOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3Qgcm93OiByb3cgPSBsaXN0W3ldO1xuICAgIHJldHVybiAocm93ICYmIHJvdy5sZW5ndGggPiB4KSA/IHJvd1t4XSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1ha2VHcmlkKCk6IHZvaWQge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5zaXplLmhlaWdodDsgeSsrKSB7XG4gICAgICBjb25zdCByb3c6IHJvdyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuc2l6ZS53aWR0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IHRpbGU6IE5hdmlnYXRvclRpbGUgPSBuZXcgTmF2aWdhdG9yVGlsZSh7IHgsIHkgfSk7XG4gICAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKTtcbiAgICAgICAgcm93LnB1c2godGlsZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IE5hdmlnYXRvckRhdGEgZnJvbSAnLi9OYXZpZ2F0b3JEYXRhJztcbmltcG9ydCByb3cgZnJvbSAnLi4vaW50ZXJmYWNlcy9yb3cnO1xuaW1wb3J0IEdyaWQgZnJvbSAnLi9HcmlkJztcbmltcG9ydCB1bmlxdWVJRCBmcm9tICcuLi91dGlsL3VuaXF1ZUlEJztcbmltcG9ydCBpZCBmcm9tICcuLi9pbnRlcmZhY2VzL2lkJztcbmltcG9ydCB7IGNvbnRhaW5zIH0gZnJvbSAnLi4vdXRpbC9pZCc7XG50eXBlIG9uRXhwbG9yZSA9ICh0aWxlOiBOYXZpZ2F0b3JUaWxlKSA9PiB2b2lkO1xudHlwZSBvbkNvbXBsZXRlID0gKHBhdGg6IE5hdmlnYXRvclRpbGVbXSkgPT4gdm9pZDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdG9yIGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSUQoKTtcbiAgcHJpdmF0ZSB2ZXJ0aWNhbENvc3Q6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgZGlhZ29uYWxDb3N0OiBudW1iZXIgPSAxLjQ7XG4gIHByaXZhdGUgbmVpZ2hib3JzQ291bnQ6IG51bWJlciA9IDk7XG4gIHByaXZhdGUgdGlsZXM6IHJvdyA9IFtdO1xuICBwcml2YXRlIG9wZW46IHJvdyA9IFtdO1xuICBwcml2YXRlIGNsb3NlZDogcm93ID0gW107XG4gIHByaXZhdGUgY3VycmVudDogTmF2aWdhdG9yVGlsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGdyaWQ6IEdyaWQsXG4gICAgcHJpdmF0ZSBiZWdpbjogTmF2aWdhdG9yVGlsZSxcbiAgICBwcml2YXRlIGVuZDogTmF2aWdhdG9yVGlsZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9uRXhwbG9yZTogb25FeHBsb3JlID0gKCkgPT4ge30sXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkNvbXBsZXRlOiBvbkNvbXBsZXRlID0gTmF2aWdhdG9yLmRlZmF1bHRPbkNvbXBsZXRlXG4gICkge31cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZE9wZW5UaWxlcyh0aGlzLmdyaWQpO1xuICAgIHRoaXMuY2FsY3VsYXRlSCgpO1xuICAgIHRoaXMuY2xvc2VkLnB1c2godGhpcy5iZWdpbik7XG4gICAgY29uc3QgYmVnaW5OYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gdGhpcy5iZWdpbi5nZXROYXZpZ2F0b3JEYXRhKHRoaXMpO1xuICAgIGJlZ2luTmF2RGF0YS5nVmFsID0gMDtcbiAgICB0aGlzLmNhbGN1bGF0ZUcodGhpcy5iZWdpbik7XG4gIH1cblxuICBwcml2YXRlIGFkZE9wZW5UaWxlcyhncmlkOiBHcmlkKTogdm9pZCB7XG4gICAgZ3JpZC5yb3dzLmZvckVhY2goKHJvdzogcm93KSA9PiB7XG4gICAgICBjb25zdCBuYXZpZ2F0b3JUaWxlczogTmF2aWdhdG9yVGlsZVtdID0gcm93Lm1hcCgodGlsZTogTmF2aWdhdG9yVGlsZSkgPT4ge1xuICAgICAgICB0aWxlLnJlZ2lzdGVyTmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRpbGU7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudGlsZXMgPSB0aGlzLnRpbGVzLmNvbmNhdChuYXZpZ2F0b3JUaWxlcyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUgoKTogdm9pZCB7XG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlOiBOYXZpZ2F0b3JUaWxlKSA9PiB7XG4gICAgICAvLyBtYW5oYXR0YW4gZGlzdGFuY2VcbiAgICAgIGNvbnN0IG5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSB0aWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgICBjb25zdCBjb2xWYWw6IG51bWJlciA9IE1hdGguYWJzKHRpbGUucG9zaXRpb24ueCAtIHRoaXMuZW5kLnBvc2l0aW9uLngpO1xuICAgICAgY29uc3Qgcm93VmFsOiBudW1iZXIgPSBNYXRoLmFicyh0aWxlLnBvc2l0aW9uLnkgLSB0aGlzLmVuZC5wb3NpdGlvbi55KTtcbiAgICAgIG5hdkRhdGEuaFZhbCA9IGNvbFZhbCArIHJvd1ZhbDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlRyh0aWxlOiBOYXZpZ2F0b3JUaWxlKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50ID0gdGlsZTtcbiAgICBjb25zdCB0aWxlTmF2RGF0YSA9IHRpbGUuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uZWlnaGJvcnNDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCB4OiBudW1iZXIgPSB0aWxlLnBvc2l0aW9uLnggKyBOYXZpZ2F0b3IuZ2V0Q29sT2Zmc2V0KGkpO1xuICAgICAgY29uc3QgeTogbnVtYmVyID0gdGlsZS5wb3NpdGlvbi55ICsgdGhpcy5nZXRSb3dPZmZzZXQoaSk7XG4gICAgICBjb25zdCBleHBsb3Jpbmc6IE5hdmlnYXRvclRpbGUgfCBudWxsID0gdGhpcy5ncmlkLmZpbmRUaWxlKHsgeCwgeSB9KTtcblxuICAgICAgaWYgKCFleHBsb3JpbmcpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4cGxvcmluZ05hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSBleHBsb3JpbmcuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcblxuICAgICAgaWYgKGV4cGxvcmluZy5pc09ic3RhY2xlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udGFpbnModGhpcy5jbG9zZWQsIGV4cGxvcmluZykpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aWxlLmlkID09PSBleHBsb3JpbmcuaWQpIHtcbiAgICAgICAgdGhpcy5jbG9zZWQucHVzaChleHBsb3JpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLmdldFBhcmVudCh0aWxlLCBleHBsb3JpbmcpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbnRhaW5zKHRoaXMub3BlbiwgZXhwbG9yaW5nKSkge1xuICAgICAgICAgIHRoaXMub3Blbi5wdXNoKGV4cGxvcmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTmF2aWdhdG9yLmlzRGlhZ29uYWwodGlsZSwgZXhwbG9yaW5nKSkge1xuICAgICAgICAgIGV4cGxvcmluZ05hdkRhdGEuZ1ZhbCA9IHRpbGVOYXZEYXRhLmdWYWwgKyB0aGlzLmRpYWdvbmFsQ29zdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3JpbmdOYXZEYXRhLmdWYWwgPSB0aWxlTmF2RGF0YS5nVmFsICsgdGhpcy52ZXJ0aWNhbENvc3Q7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXhwbG9yaW5nTmF2RGF0YS5mVmFsID0gdGhpcy5jYWxjdWxhdGVGKGV4cGxvcmluZyk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dCA9IHRoaXMuY2hvb3NlTmV4dCgpO1xuXG4gICAgaWYgKG5leHQpIHtcbiAgICAgIHRoaXMub25FeHBsb3JlKG5leHQpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVHKG5leHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXRoOiBOYXZpZ2F0b3JUaWxlW10gPSB0aGlzLmdldFBhdGgoKTtcbiAgICAgIHRoaXMub25Db21wbGV0ZShwYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUYodGlsZTogTmF2aWdhdG9yVGlsZSk6IG51bWJlciB7XG4gICAgY29uc3QgeyBnVmFsLCBoVmFsIH06IE5hdmlnYXRvckRhdGEgPSB0aWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgcmV0dXJuIGdWYWwgKyBoVmFsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSb3dPZmZzZXQoaXRlcmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIC8qXG4gICAgICAgaXRlcmF0aW9uID0gMCwgMSwgb3IgMjogWy0xXVstMV1bLTFdXG4gICAgICAgaXRlcmF0aW9uID0gMywgNCwgb3IgNTogWyAwXVsgMF1bIDBdXG4gICAgICAgaXRlcmF0aW9uID0gNiwgNywgb3IgODogWysxXVsrMV1bKzFdXG4gICAgICovXG4gICAgcmV0dXJuIHRoaXMubmVpZ2hib3JzQ291bnQgKyAtTWF0aC5mbG9vcigoMzIgLSBpdGVyYXRpb24pIC8gMyk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRDb2xPZmZzZXQoaXRlcmF0aW9uOiBudW1iZXIpOiBudW1iZXIge1xuICAgIC8qXG4gICAgICAgaXRlcmF0aW9uID0gMCwgMSwgb3IgMjogWy0xXVsgMF1bKzFdXG4gICAgICAgaXRlcmF0aW9uID0gMywgNCwgb3IgNTogWy0xXVsgMF1bKzFdXG4gICAgICAgaXRlcmF0aW9uID0gNiwgNywgb3IgODogWy0xXVsgMF1bKzFdXG4gICAgICovXG4gICAgcmV0dXJuIGl0ZXJhdGlvbiAlIDMgLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNEaWFnb25hbChcbiAgICB0aWxlOiBOYXZpZ2F0b3JUaWxlLFxuICAgIGNoZWNrVGlsZTogTmF2aWdhdG9yVGlsZVxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGlsZS5wb3NpdGlvbi54ICE9PSBjaGVja1RpbGUucG9zaXRpb24ueCAmJlxuICAgICAgdGlsZS5wb3NpdGlvbi55ICE9PSBjaGVja1RpbGUucG9zaXRpb24ueVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldFBhcmVudChcbiAgICB0aWxlOiBOYXZpZ2F0b3JUaWxlLFxuICAgIGNoZWNrVGlsZTogTmF2aWdhdG9yVGlsZVxuICApOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3QgdGlsZU5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSB0aWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgY29uc3QgY2hlY2tOYXZEYXRhOiBOYXZpZ2F0b3JEYXRhID0gY2hlY2tUaWxlLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG5cbiAgICBpZiAoIWNoZWNrTmF2RGF0YS5wYXJlbnQpIHtcbiAgICAgIGNoZWNrTmF2RGF0YS5wYXJlbnQgPSB0aWxlO1xuICAgICAgcmV0dXJuIHRpbGU7XG4gICAgfVxuXG4gICAgY29uc3QgbW92ZUNvc3QgPSBOYXZpZ2F0b3IuaXNEaWFnb25hbCh0aWxlLCBjaGVja1RpbGUpXG4gICAgICA/IHRoaXMuZGlhZ29uYWxDb3N0XG4gICAgICA6IHRoaXMudmVydGljYWxDb3N0O1xuXG4gICAgaWYgKHRpbGVOYXZEYXRhLmdWYWwgKyBtb3ZlQ29zdCA8IGNoZWNrTmF2RGF0YS5nVmFsKSB7XG4gICAgICBjaGVja05hdkRhdGEucGFyZW50ID0gdGlsZTtcbiAgICAgIHJldHVybiB0aWxlO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBjaG9vc2VOZXh0KCk6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICB0aGlzLm9wZW4gPSB0aGlzLm9wZW4uc29ydCgoYTogTmF2aWdhdG9yVGlsZSwgYjogTmF2aWdhdG9yVGlsZSkgPT4ge1xuICAgICAgY29uc3QgYU5hdkRhdGE6IE5hdmlnYXRvckRhdGEgPSBhLmdldE5hdmlnYXRvckRhdGEodGhpcyk7XG4gICAgICBjb25zdCBiTmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGIuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgIHJldHVybiBhTmF2RGF0YS5mVmFsIC0gYk5hdkRhdGEuZlZhbDtcbiAgICB9KTtcbiAgICBjb25zdCBuZXh0OiBOYXZpZ2F0b3JUaWxlIHwgdW5kZWZpbmVkID0gdGhpcy5vcGVuWzBdO1xuXG4gICAgaWYgKCFuZXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLm9wZW4uc2hpZnQoKTtcbiAgICB0aGlzLmNsb3NlZC5wdXNoKG5leHQpO1xuXG4gICAgaWYgKG5leHQuaWQgPT09IHRoaXMuZW5kLmlkKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmVuZDtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYXRoKCk6IE5hdmlnYXRvclRpbGVbXSB7XG4gICAgY29uc3QgcGF0aDogTmF2aWdhdG9yVGlsZVtdID0gW107XG4gICAgbGV0IHsgY3VycmVudCB9ID0gdGhpcztcblxuICAgIHdoaWxlIChjdXJyZW50LmlkICE9PSB0aGlzLmJlZ2luLmlkKSB7XG4gICAgICBjb25zdCBjdXJyZW50TmF2RGF0YTogTmF2aWdhdG9yRGF0YSA9IGN1cnJlbnQuZ2V0TmF2aWdhdG9yRGF0YSh0aGlzKTtcbiAgICAgIHBhdGgucHVzaChjdXJyZW50KTtcblxuICAgICAgaWYgKGN1cnJlbnROYXZEYXRhLnBhcmVudCkge1xuICAgICAgICBjdXJyZW50ID0gY3VycmVudE5hdkRhdGEucGFyZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGF0aC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0T25Db21wbGV0ZShwYXRoOiBOYXZpZ2F0b3JUaWxlW10pIHtcbiAgICBjb25zb2xlLmxvZyhwYXRoKTtcbiAgfVxufVxuIiwiaW1wb3J0IE5hdmlnYXRvciBmcm9tICcuL05hdmlnYXRvcic7XG5pbXBvcnQgaWQgZnJvbSAnLi4vaW50ZXJmYWNlcy9pZCc7XG5pbXBvcnQgdW5pcXVlSUQgZnJvbSAnLi4vdXRpbC91bmlxdWVJRCc7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0b3JEYXRhIGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSUQoKTtcbiAgZ1ZhbDogbnVtYmVyOyAvLyBkaXN0YW5jZSBmcm9tIHN0YXJ0XG4gIGhWYWw6IG51bWJlcjsgLy8gZGlzdGFuY2UgZnJvbSBlbmRcbiAgZlZhbDogbnVtYmVyOyAvLyBnQ29zdCArIGhDb3N0XG4gIHBhcmVudDogTmF2aWdhdG9yVGlsZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbmF2aWdhdG9yOiBOYXZpZ2F0b3IpIHt9XG59XG4iLCJpbXBvcnQgaWQgZnJvbSAnLi4vaW50ZXJmYWNlcy9pZCc7XG5pbXBvcnQgdW5pcXVlSWQgZnJvbSAnLi4vdXRpbC91bmlxdWVJRCc7XG5pbXBvcnQgcG9pbnQgZnJvbSAnLi4vaW50ZXJmYWNlcy9wb2ludCc7XG5pbXBvcnQgTmF2aWdhdG9yIGZyb20gJy4vTmF2aWdhdG9yJztcbmltcG9ydCB7IGNvbnRhaW5zIH0gZnJvbSAnLi4vdXRpbC9pZCc7XG5pbXBvcnQgTmF2aWdhdG9yRGF0YSBmcm9tICcuL05hdmlnYXRvckRhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0b3JUaWxlIGltcGxlbWVudHMgaWQge1xuICBpZDogbnVtYmVyID0gdW5pcXVlSWQoKTtcbiAgaXNPYnN0YWNsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIG5hdmlnYXRvcnM6IE5hdmlnYXRvckRhdGFbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHBvc2l0aW9uOiBwb2ludCkge31cblxuICByZWdpc3Rlck5hdmlnYXRvckRhdGEobmF2aWdhdG9yOiBOYXZpZ2F0b3IpOiBib29sZWFuIHtcbiAgICBjb25zdCBuYXZpZ2F0aW9uRGF0YTogTmF2aWdhdG9yRGF0YSA9IG5ldyBOYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcik7XG5cbiAgICBpZiAoY29udGFpbnModGhpcy5uYXZpZ2F0b3JzLCBuYXZpZ2F0aW9uRGF0YSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLm5hdmlnYXRvcnMucHVzaChuYXZpZ2F0aW9uRGF0YSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXROYXZpZ2F0b3JEYXRhKG5hdmlnYXRvcjogTmF2aWdhdG9yKTogTmF2aWdhdG9yRGF0YSB8IG51bGwge1xuICAgIGNvbnN0IG5hdkRhdGEgPSB0aGlzLm5hdmlnYXRvcnMuZmluZCgobmF2aWdhdGlvbkRhdGE6IE5hdmlnYXRvckRhdGEpID0+IHtcbiAgICAgIHJldHVybiBuYXZpZ2F0aW9uRGF0YS5uYXZpZ2F0b3IuaWQgPT09IG5hdmlnYXRvci5pZDtcbiAgICB9KTtcblxuICAgIHJldHVybiBuYXZEYXRhID8gbmF2RGF0YSA6IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBHcmlkIGZyb20gJy4vR3JpZCc7XG5pbXBvcnQgTmF2aWdhdG9yVGlsZSBmcm9tICcuL05hdmlnYXRvclRpbGUnO1xuaW1wb3J0IHsgaW50IH0gZnJvbSAnLi4vdXRpbC9yYW5kb20nO1xuaW1wb3J0IHsgY29udGFpbnMsIGZpbmRJbmRleCB9IGZyb20gJy4uL3V0aWwvaWQnO1xuaW1wb3J0IHJvdyBmcm9tICcuLi9pbnRlcmZhY2VzL3Jvdyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic3RhY2xlcyB7XG4gIHByaXZhdGUgcmVhZG9ubHkgb3Blbkxpc3Q6IE5hdmlnYXRvclRpbGVbXSA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IGNsb3NlZExpc3Q6IE5hdmlnYXRvclRpbGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogR3JpZCkge1xuICAgIHRoaXMub3Blbkxpc3QgPSBncmlkLnRpbGVzO1xuICB9XG5cbiAgZ2V0IGxpc3QoKTogTmF2aWdhdG9yVGlsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5jbG9zZWRMaXN0O1xuICB9XG5cbiAgYWRkKHRpbGU6IE5hdmlnYXRvclRpbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlKHRydWUsIHRpbGUpO1xuICB9XG5cbiAgcmVtb3ZlKHRpbGU6IE5hdmlnYXRvclRpbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlKGZhbHNlLCB0aWxlKTtcbiAgfVxuXG4gIGFkZFJhbmRvbShjb3VudDogbnVtYmVyID0gMSk6IE5hdmlnYXRvclRpbGUgfCByb3cgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTXVsdGlwbGVSYW5kb20odHJ1ZSwgY291bnQpO1xuICB9XG5cbiAgcmVtb3ZlUmFuZG9tKGNvdW50OiBudW1iZXIgPSAxKTogTmF2aWdhdG9yVGlsZSB8IHJvdyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVNdWx0aXBsZVJhbmRvbShmYWxzZSwgY291bnQpO1xuICB9XG5cbiAgZ2V0UmFuZG9tT3BlbigpOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmFuZG9tKHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSYW5kb20ob3BlbjogYm9vbGVhbik6IE5hdmlnYXRvclRpbGUgfCBudWxsIHtcbiAgICBjb25zdCBsaXN0ID0gb3BlbiA/IHRoaXMub3Blbkxpc3QgOiB0aGlzLmNsb3NlZExpc3Q7XG4gICAgY29uc3QgcmFuZG9tOiBudW1iZXIgPSBpbnQoMCwgbGlzdC5sZW5ndGggLSAxKTtcbiAgICBjb25zdCB0aWxlID0gbGlzdFtyYW5kb21dO1xuICAgIHJldHVybiB0aWxlID8gdGlsZSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIG1hbmlwdWxhdGVNdWx0aXBsZVJhbmRvbShcbiAgICBhZGQ6IGJvb2xlYW4sXG4gICAgY291bnQ6IG51bWJlclxuICApOiBOYXZpZ2F0b3JUaWxlIHwgcm93IHwgbnVsbCB7XG4gICAgY29uc3QgdGlsZXM6IHJvdyA9IFtdO1xuXG4gICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRpbGU6IE5hdmlnYXRvclRpbGUgPSB0aGlzLm1hbmlwdWxhdGVTaW5nbGVSYW5kb20oYWRkKTtcbiAgICAgICAgdGlsZXMucHVzaCh0aWxlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvdW50ID09PSAxID8gdGlsZXNbMF0gOiB0aWxlcztcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgbWFuaXB1bGF0ZVNpbmdsZVJhbmRvbShhZGQ6IGJvb2xlYW4pOiBOYXZpZ2F0b3JUaWxlIHwgbnVsbCB7XG4gICAgY29uc3QgdGlsZSA9IHRoaXMuZ2V0UmFuZG9tKGFkZCk7XG5cbiAgICBpZiAodGlsZSkge1xuICAgICAgdGhpcy5tYW5pcHVsYXRlKGFkZCwgdGlsZSk7XG4gICAgICByZXR1cm4gdGlsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgbWFuaXB1bGF0ZShhZGQ6IGJvb2xlYW4sIHRpbGU6IE5hdmlnYXRvclRpbGUpOiBib29sZWFuIHtcbiAgICBjb25zdCBpc0ludmFsaWQ6IGJvb2xlYW4gPSBhZGQgPyB0aWxlLmlzT2JzdGFjbGUgOiAhdGlsZS5pc09ic3RhY2xlO1xuXG4gICAgaWYgKGlzSW52YWxpZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBsaXN0OiBOYXZpZ2F0b3JUaWxlW107XG4gICAgbGV0IG90aGVyTGlzdDogTmF2aWdhdG9yVGlsZVtdO1xuXG4gICAgaWYgKGFkZCkge1xuICAgICAgbGlzdCA9IHRoaXMub3Blbkxpc3Q7XG4gICAgICBvdGhlckxpc3QgPSB0aGlzLmNsb3NlZExpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QgPSB0aGlzLmNsb3NlZExpc3Q7XG4gICAgICBvdGhlckxpc3QgPSB0aGlzLm9wZW5MaXN0O1xuICAgIH1cblxuICAgIGlmIChjb250YWlucyhsaXN0LCB0aWxlKSkge1xuICAgICAgdGlsZS5pc09ic3RhY2xlID0gYWRkO1xuICAgICAgY29uc3QgaW5kZXggPSBmaW5kSW5kZXgobGlzdCwgdGlsZSk7XG4gICAgICBsaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICBvdGhlckxpc3QucHVzaCh0aWxlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IEdyaWQgZnJvbSAnLi9jbGFzc2VzL0dyaWQnO1xuaW1wb3J0IE5hdmlnYXRvciBmcm9tICcuL2NsYXNzZXMvTmF2aWdhdG9yJztcbmltcG9ydCBOYXZpZ2F0b3JUaWxlIGZyb20gJy4vY2xhc3Nlcy9OYXZpZ2F0b3JUaWxlJztcblxuZXhwb3J0IHsgR3JpZCwgTmF2aWdhdG9yLCBOYXZpZ2F0b3JUaWxlIH07XG4iLCJpbXBvcnQgaWQgZnJvbSAnLi4vaW50ZXJmYWNlcy9pZCc7XG5cbmNvbnN0IGNvbnRhaW5zID0gKGFycmF5OiBpZFtdLCBlbGVtZW50OiBpZCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gZmluZEluZGV4KGFycmF5LCBlbGVtZW50KSAhPT0gLTE7XG59O1xuXG5jb25zdCBmaW5kSW5kZXggPSAoYXJyYXk6IGlkW10sIGZpbmQ6IGlkKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIGFycmF5LmZpbmRJbmRleCgoZWxlbWVudDogaWQpID0+IGVsZW1lbnQuaWQgPT09IGZpbmQuaWQpO1xufTtcblxuZXhwb3J0IHsgY29udGFpbnMsIGZpbmRJbmRleCB9O1xuIiwiY29uc3QgaW50ID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLnJvdW5kKGZsb2F0KG1pbiwgbWF4KSk7XG59O1xuXG5jb25zdCBmbG9hdCA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xufTtcblxuY29uc3QgY29sb3I9ICgpID0+IHtcbiAgY29uc3QgciA9IGludCgwLCAyNTUpO1xuICBjb25zdCBnID0gMDsvL2ludCgwLCAyNTUpO1xuICBjb25zdCBiID0gMDsvL2ludCgwLCAyNTUpO1xuICByZXR1cm4gYHJnYigke3J9LCR7Z30sJHtifSlgO1xufTtcblxuZXhwb3J0IHsgaW50LCBmbG9hdCwgY29sb3IgfTtcbiIsImxldCBpZCA9IDA7XG5cbmNvbnN0IHVuaXF1ZUlkID0gKCk6IG51bWJlciA9PiBpZCsrO1xuXG5leHBvcnQgZGVmYXVsdCB1bmlxdWVJZDtcbiJdLCJzb3VyY2VSb290IjoiIn0=