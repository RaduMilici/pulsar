const fs = require('fs');
const webpack = require('webpack');
const chalk = require('chalk');
const { config, debuggerRoot } = require('./webpack.config');


const onBuildComplete = () => {
  const src = `${debuggerRoot}/src/indesx.html`;
  const dest = `${debuggerRoot}/build/index.html`;
  try {
    fs.copyFileSync(src, dest);
    console.log(chalk.green.bold('*** successfully built Pulsar debugger ***'));    
  }
  catch (err) {
    console.error(chalk.red.bold('*** error building Pulsar debugger ***')); 
    console.error(err);    
  }  
}

webpack(config).run(onBuildComplete);
