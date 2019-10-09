const path = require('path');
const madge = require('madge');
const entryPointPath = path.resolve(`${__dirname}/../src/index.ts`);
const tsConfig = path.resolve(`${__dirname}/../tsconfig.json`);
const picturePath = path.resolve(`${__dirname}/dependencyTree.png`);
const config = { 
  fileExtensions: ['ts'], 
  tsConfig,
  cyclicNodeColor: 'red'
};

madge(entryPointPath, config).then(res => {
  res.image(picturePath);
});
