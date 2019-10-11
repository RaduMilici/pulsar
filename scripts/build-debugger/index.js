const fs = require('fs-extra');
const webpack = require('webpack');
const chalk = require('chalk');
const { config, debuggerRoot } = require('./webpack.config');
const { generateDTSfiles, concatDTSfiles } = require('./ast');

const onBuildComplete = () => {
  try {
    copyIndexToDist();
    generateDTSfiles();
    concatDTSfiles();
    moveDTSBundle();
    fs.removeSync(`${__dirname}/dtsBuild`);
    console.log(chalk.green.bold('\n*** successfully built Pulsar debugger ***'));    
  }
  catch (err) {
    console.error(chalk.red.bold('\n*** error building Pulsar debugger ***')); 
    console.error(err);    
  }  
}

const copyIndexToDist = () => {
  const src = `${debuggerRoot}/src/index.html`;
  const dest = `${debuggerRoot}/build/index.html`;
  fs.copyFileSync(src, dest);
}

const moveDTSBundle = () => {
  const src = `${__dirname}/bundle.ts`;
  const dest = `${debuggerRoot}/src/editor/dtsBundle.ts`;
  fs.moveSync(src, dest, { overwrite: true });
}

webpack(config).run(onBuildComplete);
