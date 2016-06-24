const utils = require('./utils');

exports.fileLoader = {
  include: utils.resolve('src/'),
  loader: 'file',
  query: {
    name: '[name].[ext]'
  },
  test: /\.html$/
};

exports.tsLoader = {
  include: utils.resolve('src/'),
  loader: 'awesome-typescript',
  query: {
    forkChecker: true
  },
  test: /\.tsx?$/
};

exports.tslintLoader = {
  include: utils.resolve('src/'),
  loader: 'tslint',
  test: /\.tsx?$/
};
