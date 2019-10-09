const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './debugger/src/index.ts',
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
              configFile: path.resolve(__dirname, 'debugger/tsconfig.webpack.json'),
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
    path: path.resolve(__dirname, 'debugger/build/'),
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['typescript']
    })
  ]
};