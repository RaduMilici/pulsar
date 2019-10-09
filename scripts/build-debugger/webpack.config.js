const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const debuggerRoot = path.resolve(__dirname, '../../debugger')

const config = {
  mode: 'development',
  entry: {
    main: `${debuggerRoot}/src/index.ts`,
    // pulsar: './src/index.ts'
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
              // transpileOnly: true
            }  
          }
        ],
        exclude: [/node_modules/]      
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
      languages: ['typescript']
    })
  ]
};

module.exports = { config, debuggerRoot };
