const fs = require('fs-extra');
const webpack = require('webpack');
const chalk = require('chalk');
const { config, debuggerRoot } = require('./webpack.config');
const { generateDTSfiles, concatDTSfiles } = require('./ast');

const prepareForBuild = () => {
  try {
    copyIndexToDist();
    generateDTSfiles();
    concatDTSfiles();
    moveDTSBundle();
    fs.removeSync(`${__dirname}/dtsBuild`);   
  }
  catch (err) {
    console.error(chalk.red.bold('\n*** error building Pulsar debugger ***')); 
    console.error(err);    
  }  
}

const copyIndexToDist = () => {
  const src = `${debuggerRoot}/src/index.html`;
  const dest = `${debuggerRoot}/build/index.html`;
  fs.ensureDirSync(`${debuggerRoot}/build`);
  fs.copyFileSync(src, dest);
}

const moveDTSBundle = () => {
  const src = `${__dirname}/bundle.ts`;
  const dest = `${debuggerRoot}/src/editor/dtsBundle.ts`;
  fs.moveSync(src, dest, { overwrite: true });
}

prepareForBuild();
webpack(config).run(() => {
  console.log(chalk.green.bold('\n*** successfully built Pulsar debugger ***')); 
});

