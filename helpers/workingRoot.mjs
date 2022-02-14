import * as path from 'path';

function addPath(dir, args) {
  'use strict';

  args = Array.prototype.slice.call(args, 0);
  return path.join.apply(path, [dir].concat(args));
}

let currentDir;

export function setDir(dir) {
  currentDir = dir;
}

export function getDir(...params) {
  return addPath(currentDir, params);
}
