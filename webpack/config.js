const loaders = require('./loaders');
const plugins = require('./plugins');
const utils = require('./utils');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

console.log(`Bundling in '${process.env.NODE_ENV}' mode.`);

module.exports = {
  bail: !utils.isDevMode(),
  devServer: {
    contentBase: utils.resolve('public/'),
    https: true,
    open: true,
    port: 3000
  },
  devtool: utils.isDevMode() ? 'source-map' : 'hidden-source-map',
  entry: utils.resolve('src/index.tsx'),
  externals: utils.isDevMode() ? {} : {
    'mobx-react-devtools': '{}',
    'utils/invariant': '{}'
  },
  module: {
    loaders: [loaders.fileLoader, loaders.tsLoader],
    preLoaders: [loaders.tslintLoader]
  },
  output: {
    filename: 'client.js',
    libraryTarget: 'var',
    path: utils.resolve('public/'),
    publicPath: '/'
  },
  plugins: [
    plugins.cleanWebpackPlugin,
    plugins.definePlugin,
    plugins.forkCheckerPlugin,
    plugins.loaderOptionsPlugin,
    plugins.noErrorsPlugin
  ].concat(utils.isDevMode() ? [] : [
    plugins.uglifyJsPlugin
  ]),
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx'],
    modules: [utils.resolve('src/'), 'node_modules/']
  },
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
};
