<p align="center">
    <img
      alt="Node.js"
      src="https://i.imgur.com/1ltGIyN.png"
      width="200"
    />
</p>

<p align="center">pulsar-pathfinding is a TypeScript implementation of the Greedy Best-First 
pathfinding algorithm.</p>


## README IN PROGRESS

<h2 align="center">Install</h2>
Install with npm:

```bash
npm install pulsar-pathfinding
```

<h2 align="center">Examples</h2>  
_NOTE: All pictures below are captured from debug mode. You may use the results in any way, graphical or not._

#### 1: Start by creating a `Grid`.  
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

#### 2: Create a `Navigator`.  
This is the object that traverses the `Grid` you created.  
It requires the following as constructor arguments: a grid, a begin tile and an end tile.  
Tiles are stored by the `Grid` and can be accessed either by grid coordinates  
```javascript
const tile: NavigatorTile = grid.findTile({x: 0, y: 0});
```

or randomly:

```javascript
const randomTile: NavigatorTile = grid.randomTile();         // any possible tile
const randomFreeTile: NavigatorTile = grid.randomFreeTile(); // only tiles that are not obstacles
```

Knowing this, we can now create a `Navigator`.

```javascript
import { Navigator, NavigatorTile } from 'pulsar-pathfinding';
const begin: NavigatorTile = grid.findTile({x: 0, y: 0});
const end: NavigatorTile = grid.findTile({x: 9, y: 9});
const navigator: Navigator = new Navigator(grid, begin, end);
```

Once created, we now call the `start` method.  
The path (a `NavigatorTile` array), is stored in the `path` property.

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

Optionally, it may receive two additional callback functions, in the form of `onExplore`
and `onComplete`.  
The `Navigator` explores multiple possible tiles until it finds the shortest route.  

Every time a `NavigatorTile` is explored, the `onExplore` function is called, with the
respective tile passed as an argument.  
  
Once the shortest path is found, the `onComplete` function is called, with an array of 
`NavigatorTile`s passed as an argument.  

<p align="center">
    Pictured below: an artificially slowed down demonstration of callbacks.
    <br>
    Blue tiles are colored using onExplore and blue ones using onComplete.
    <br>
    <img
      alt="Node.js"
      src="https://i.imgur.com/1ZtKjZ0.gif"
      width="300"
    />
</p>

#### 3: Creating obstacles. 



