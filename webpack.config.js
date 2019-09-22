const process = require('process');
const path = require('path');
const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    host: process.env.INVERTER_ANALYSIS_HOST,
    port: process.env.INVERTER_ANALYSIS_PORT,
    watchContentBase: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!src/index.ejs',
      inject: 'body',
      xhtml: true,
      filename: 'index.html',
      templateParameters: {
        title: 'Inverter Analysis',
        configJs: `
          window.config = {
            INVERTER_ANALYSIS_PROT: '${process.env.INVERTER_ANALYSIS_PROT}',
            INVERTER_ANALYSIS_HOST: '${process.env.INVERTER_ANALYSIS_HOST}',
            INVERTER_ANALYSIS_PORT: '${process.env.INVERTER_ANALYSIS_PORT}',
            INVERTER_ANALYSIS_BASE: '${process.env.INVERTER_ANALYSIS_BASE}',
            FORMBAY_API_PROT: '${process.env.FORMBAY_API_PROT}',
            FORMBAY_API_HOST: '${process.env.FORMBAY_API_HOST}',
            FORMBAY_API_PORT: '${process.env.FORMBAY_API_PORT}'
          };
        `
      }
    })
  ]
};
