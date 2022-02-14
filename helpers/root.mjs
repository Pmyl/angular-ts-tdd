import * as path from 'path';
import { fileURLToPath } from 'url';

const _root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function getRoot(args) {
  'use strict';

  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
