const path = require('path');

function addPath(dir, args) {
  'use strict';

  var args = Array.prototype.slice.call(args, 0);
  return path.join.apply(path, [dir].concat(args));
}

const workingRoot = {
  setDir(dir) {
    this.dir = dir;
  },
  getDir() {
    return addPath(this.dir, arguments);
  }
};

module.exports = workingRoot;
