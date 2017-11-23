#!/usr/bin/env node

/* globals require, process */
const shellParams = require('./helpers/shellParams');
const updateBundle = require('./select/update-bundle');
const path = require('path');

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
