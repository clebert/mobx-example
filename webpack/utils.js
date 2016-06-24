const path = require('path');

exports.isDevMode = function () {
  return process.env.NODE_ENV !== 'production';
};

exports.resolve = function (filename) {
  return path.resolve(__dirname, '../', filename);
};
