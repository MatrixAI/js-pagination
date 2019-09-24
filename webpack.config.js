const path = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const commonConfig = {
  target: 'node',
  entry: {
    index: './src/index.ts',
    offset: './src/offset.ts',
    cursor: './src/cursor.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [],
  optimization: {
    minimize: false
  }
};

const browserConfig = {
  target: 'web',
  entry: {
    index: './src/index.ts',
    offset: './src/offset.ts',
    cursor: './src/cursor.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist/browser'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: []
};

module.exports = [commonConfig, browserConfig];
