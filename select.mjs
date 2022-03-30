#!/usr/bin/env node

import * as shellParams from './helpers/shellParams.mjs';
import { updateBundle } from './select/update-bundle.mjs';
import * as path from 'path';

(function() {
  'use strict';

  const directoryOrFilePath = shellParams.get().path;
  let fileName,
    folderFilePath;

  if (isDirectory(directoryOrFilePath)) {
    fileName = '.spec.ts';
    folderFilePath = directoryOrFilePath;
    console.info(`Directory selected.\n\n${logFiles('all files in folder', folderFilePath)}`);
  } else if (isSpecFile(directoryOrFilePath)) {
    fileName = getFileName(directoryOrFilePath);
    folderFilePath = getDirectoryPath(directoryOrFilePath);
    console.info(`Spec file selected.\n\n${logFiles(fileName, folderFilePath)}`);
  } else {
    const specFilePath = directoryOrFilePath.replace('.ts', '.spec.ts');
    fileName = getFileName(specFilePath);
    folderFilePath = getDirectoryPath(specFilePath);
    console.info(`Non-directory and non-spec file selected, assuming this is the file to test.\n\n${logFiles(fileName, folderFilePath)}`);
  }

  updateBundle(folderFilePath, fileName);

  function logFiles(file, folder) {
    return `File watched: ${file}\nFolder: ${folder}`;
  }

  function isSpecFile(filePath) {
    return path.basename(filePath).indexOf('.spec.ts') > 0;
  }

  function isDirectory(filePath) {
    return path.basename(filePath).indexOf('.ts') < 0;
  }

  function getDirectoryPath(filePath) {
    return path.dirname(filePath);
  }

  function getFileName(filePath) {
    return path.basename(filePath);
  }
})();
