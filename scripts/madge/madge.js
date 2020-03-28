const path = require('path');
const madge = require('madge');
const chalk = require('chalk');

const entryPointPath = path.resolve(`${__dirname}/../../src/index.ts`);
const tsConfig = path.resolve(`${__dirname}/../../tsconfig.json`);
const picturePath = path.resolve(`${__dirname}/dependencyTree.png`);
const config = { 
  fileExtensions: ['ts'], 
  tsConfig,
  cyclicNodeColor: 'red'
};

madge(entryPointPath, config).then(res => {
  res.image(picturePath);
  
  const circularDependencies = res.circular();

  console.warn(chalk.yellow('***WARNINGS***'));
  console.warn(res.warnings());
  
  console.error(chalk.red('***CIRCULAR DEPENDENCIES***'));
  console.error(circularDependencies);
  console.error(chalk.red(`${circularDependencies.length} circular dependencies`));
});
