const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const utils = require('./utils');
const webpack = require('webpack');

exports.cleanWebpackPlugin = new CleanWebpackPlugin([
  utils.resolve('public/')
], {
  root: utils.resolve('./')
});

exports.definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
});

exports.forkCheckerPlugin = new ForkCheckerPlugin();

exports.loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
  debug: utils.isDevMode(),
  minimize: !utils.isDevMode(),
});

exports.noErrorsPlugin = new webpack.NoErrorsPlugin();

exports.uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  output: {
    comments: false
  },
  sourceMap: true
});
