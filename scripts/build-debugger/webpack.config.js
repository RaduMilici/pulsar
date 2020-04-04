const path = require('path');
const WebpackBar = require('webpackbar');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const debuggerRoot = path.resolve(__dirname, '../../debugger');

const config = {
  mode: 'development',
  entry: {
    main: `${debuggerRoot}/src/index.ts`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { 
            loader: 'ts-loader',
            options: {
              configFile: `${debuggerRoot}/tsconfig.webpack.json`,
            }  
          }
        ],
        exclude: [/node_modules/]      
      },
      {
        test: /\.css$/,
        use: [
          { 
            loader: 'style-loader', 
            options: 
              { 
                injectType: 'styleTag' 
              } 
            },
          'css-loader',
        ],
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: `${debuggerRoot}/build`,
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['typescript'],
      features: ['!gotoSymbol']
    }),
    new WebpackBar()
  ]
};

module.exports = { config, debuggerRoot };
