const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const devMode = nodeEnv !== 'production';

function resolve(filename) {
  return path.resolve(__dirname, '../', filename);
}

console.log(`Bundling in '${nodeEnv}' mode.`);

module.exports = {
  bail: !devMode,
  devServer: {
    contentBase: resolve('public/'),
    https: true,
    open: true,
    port: 3000
  },
  devtool: devMode ? 'source-map' : 'hidden-source-map',
  entry: resolve('src/index.tsx'),
  externals: devMode ? {} : {
    'mobx-react-devtools': '{}',
    'utils/invariant': '{}'
  },
  module: {
    loaders: [
      {
        include: resolve('src/'),
        loader: 'awesome-typescript',
        query: {
          forkChecker: true
        },
        test: /\.tsx?$/
      },
      {
        include: resolve('src/'),
        loader: 'file',
        query: {
          name: '[name].[ext]'
        },
        test: /\.html$/
      }
    ],
    preLoaders: [
      {
        include: resolve('src/'),
        loader: 'tslint',
        test: /\.tsx?$/
      }
    ]
  },
  output: {
    filename: 'client.js',
    libraryTarget: 'var',
    path: resolve('public/'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin([
      resolve('public/')
    ], {
      root: resolve('./')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new ForkCheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: devMode,
      minimize: !devMode,
    }),
    new webpack.NoErrorsPlugin()
  ].concat(devMode ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: true
    })
  ]),
  resolve: {
    extensions: [
      '',
      '.js',
      '.ts',
      '.tsx'
    ],
    modules: [
      resolve('src/'),
      'node_modules/'
    ]
  },
  tslint: {
    emitErrors: true,
    failOnHint: true
  }
};
