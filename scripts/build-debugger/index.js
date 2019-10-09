const fs = require('fs-extra');
const webpack = require('webpack');
const chalk = require('chalk');
const { config, debuggerRoot } = require('./webpack.config');

const onBuildComplete = () => {
  try {
    copyIndexToDist();
    copyInterfacesToDist();
    console.log(chalk.green.bold('*** successfully built Pulsar debugger ***'));    
  }
  catch (err) {
    console.error(chalk.red.bold('*** error building Pulsar debugger ***')); 
    console.error(err);    
  }  
}

const copyIndexToDist = () => {
  const src = `${debuggerRoot}/src/index.html`;
  const dest = `${debuggerRoot}/build/index.html`;
  fs.copyFileSync(src, dest);
}

const copyInterfacesToDist = () => {
  const src = `${debuggerRoot}/src/interfaces`;
  const dest = `${debuggerRoot}/build/interfaces`;
  fs.copySync(src, dest);
}

webpack(config).run(onBuildComplete);
