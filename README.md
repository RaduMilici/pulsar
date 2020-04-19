<p align="center">
    <img
      alt="Node.js"
      src="https://i.imgur.com/sp4pcTK.png"
      width="200"
    />
</p>

[![Build Status](https://travis-ci.org/RaduMilici/pulsar.svg?branch=master)](https://travis-ci.org/RaduMilici/pulsar)

<p align="center">pulsar-pathfinding is a TypeScript implementation of the Greedy Best-First 
pathfinding algorithm.</p>


## README IN PROGRESS

<h2 align="center">Install</h2>
Install with npm:

```bash
npm install pulsar-pathfinding
```

<h2 align="center">Examples</h2>  
NOTE: All pictures below are captured from debug mode. You may use the results in any way, 
graphical or not.

#### 1: Creating the `Grid`.  
This represents an abstract mathematical graph of nodes implemented as `NavigatorTile`.
It may have any `width` and `height` as a constructor argument, and it defaults to
`{width: 10, height: 10}`.
```javascript
import { Grid } from 'pulsar-pathfinding';
const grid: Grid = new Grid({width: 10, height: 10});
```
<p align="center">
    <img
      alt="Node.js"
      src="https://i.imgur.com/F03W6WF.png"
      width="200"
    />
</p>

#### 2: Accessing `NavigatorTile` on the grid

`NavigatorTile` are stored by the `Grid` and can be accessed either by grid coordinates
```javascript
const begin: NavigatorTile = grid.findTile({x: 0, y: 0});
const end: NavigatorTile = grid.findTile({x: 9, y: 9});
```

or randomly:

```javascript
const randomTile: NavigatorTile = grid.randomTile();         // any possible tile
const randomFreeTile: NavigatorTile = grid.randomFreeTile(); // only tiles that are not obstacles
```

#### 3: Creating `Obstacles`.

`Obstacles` can be added and removed with the `add(tile)`, `remove(tile)` methods
on `grid.obstacles`

```javascript
  const tile: NavigatorTile = grid.findTile({x: 0, y: 0});
  grid.obstacles.add(tile); // tile.isObstacle = true
  grid.obstacles.remove(tile); // tile.isObstacle = false
```

#### 4: Creating a `Navigator`.
This is the object that traverses the `Grid` you created.
It requires the following as constructor arguments: a grid, a begin tile and an end tile.

```javascript
import { Navigator } from 'pulsar-pathfinding';

const grid: Grid = new Grid({width: 10, height: 10});

const begin: NavigatorTile = grid.findTile({x: 1, y: 1});
const end: NavigatorTile = grid.findTile({x: 9, y: 9});

const navigator: Navigator = new Navigator({grid, begin, end});
```

Optionally, `Navigator` may receive two callback functions, in the form of `onExplore` and `onComplete`.  
and an optional `maxSteps` parameter.  

```typescript
const navigator: Navigator = new Navigator({
  grid,
  begin,
  end,
  onExplore: (NavigatorTile) => {
    // NavigatorTile
  },
  onComplete: (NavigatorTileArray) => {
    // NavigatorTile[]
  },
  maxSteps: 10,
});
```

`onExplore(NavigatorTile)` will be called for each `NavigatorTile` that the `Navigator` explores  
`onComplete(NavigatorTile[])` will be called with the array of `NavigatorTile`s in the shortest path that the `Navigator` found

The `Navigator` explores multiple possible tiles until it finds the shortest route.  

If No path is found, `onComplete` will return an empty Array

<p align="center">
    Pictured below: an artificially slowed down demonstration of callbacks.
    <br>
    Blue tiles are colored using onExplore and green ones using onComplete.
    <br>
    <img
      alt="Node.js"
      src="https://i.imgur.com/1ZtKjZ0.gif"
      width="300"
    />
</p>

Once the navigator is created, we now call the `start` method.  
The resulting path (a `NavigatorTile` array), is stored in the `path` property.

```javascript
navigator.start();
draw(navigator.path);
```

<p align="center">
  <img
    alt="Node.js"
    src="https://i.imgur.com/4GkbWly.png"
    width="200"
  />
</p>