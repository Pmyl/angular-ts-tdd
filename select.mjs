#!/usr/bin/env node

/* globals require, process */
import * as shellParams from './helpers/shellParams.mjs';
import { updateBundle } from './select/update-bundle.mjs';
import * as path from 'path';

(function() {
  'use strict';

  const directoryOrFilePath = shellParams.get().path;
  let fileName,
    folderFilePath;

  if (isSpecFile(directoryOrFilePath)) {
    fileName = getFileName(directoryOrFilePath);
    folderFilePath = getDirectoryPath(directoryOrFilePath);
  } else {
    fileName = '.spec.ts';
    folderFilePath = directoryOrFilePath;
  }

  updateBundle(folderFilePath, fileName);

  function isSpecFile(filePath) {
    return path.basename(filePath).indexOf('.spec.ts') > 0;
  }

  function getDirectoryPath(filePath) {
    return path.dirname(filePath);
  }

  function getFileName(filePath) {
    return path.basename(filePath);
  }
})();
