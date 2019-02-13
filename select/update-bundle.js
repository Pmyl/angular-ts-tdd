/* globals require */
const fs = require('fs');
const path = require('path');
const generatedFileName = 'bundle.js';
const root = require('../helpers/root');

function updateBundle(_fileDir, _escapedFileName) {
  'use strict';
  _fileDir = escapeRegExp(_fileDir);
  const fileNameEscaped = escapeRegExp(_escapedFileName);
  const nodeModulesDir = getNodeModulesDir();
  const fileContent = getFileContent(_fileDir, fileNameEscaped, nodeModulesDir);

  fs.writeFileSync(path.join(root(), generatedFileName), fileContent, 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });

  process.exit();
}

function replaceWebpackPlaceholders(content, fileDir, fileName) {
  let contentWithDir = replaceFileDir(content, fileDir);

  return replaceFileName(contentWithDir, fileName);
}

function replaceFileDir(content, fileDir) {
  return content.replace(/KARMA_FAST_FILE_DIR/g, fileDir);
}

function replaceFileName(content, fileName) {
  return content.replace(/KARMA_FAST_FILE_NAME/g, fileName);
}

function getFileContent(_fileDir, _escapedFileName) {
  const webpackRequireContext = fs.readFileSync(path.join(__dirname, 'webpack-require-context.js'), 'utf8');

  const updatedWebPackRequireContext = replaceWebpackPlaceholders(webpackRequireContext, _fileDir, _escapedFileName);

  return updatedWebPackRequireContext;
}

function getNodeModulesDir() {
  return path.join(process.cwd(), 'node_modules');
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

module.exports = updateBundle;
