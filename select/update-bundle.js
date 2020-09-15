/* globals require */
const fs = require('fs');
const path = require('path');
const generatedFileName = 'bundle.js';
const root = require('../helpers/root');
const shellParams = require('../helpers/shellParams');

function updateBundle(_fileDir, _escapedFileName) {
  'use strict';

  const fileNameEscaped = escapeRegExp(_escapedFileName);
  const nodeModulesDir = getNodeModulesDir();
  const fileContent = getFileContent(_fileDir, fileNameEscaped, nodeModulesDir);

  fs.writeFileSync(path.join(root(), generatedFileName), fileContent, 'utf8', function (err) {
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

function replaceModulePlaceholders(content, nodeModulesDir) {
  return replaceNodeModulesDir(content, nodeModulesDir);
}

function replaceFileDir(content, fileDir) {
  return content.replace(/KARMA_FAST_FILE_DIR/g, fileDir);
}

function replaceFileName(content, fileName) {
  return content.replace(/KARMA_FAST_FILE_NAME/g, fileName);
}

function replaceNodeModulesDir(content, nodeModulesDir) {
  return content.replace(/NODE_MODULES_DIR/g, escapeRegExp(nodeModulesDir));
}

function replaceCustomBaseTestFile(content, filePath) {
  return content.replace(/CUSTOM_BASE_TEST_FILE_PATH/g, escapeRegExp(filePath));
}

function findBaseTestPath(workingDir) {
  const rootPath = path.parse(workingDir).root;

  while(true) {
    const baseSpecPath = path.join(workingDir, './base.spec.ts');

    if (fs.existsSync(baseSpecPath)) {
      return baseSpecPath;
    }

    if (workingDir === rootPath) {
      return '';
    }

    workingDir = path.join(workingDir, '..');
  }
}

function getFileContent(_fileDir, _escapedFileName, _nodeModulesDir) {
  const fileDir = path.parse(_fileDir);

  let customBaseTestFilePath = shellParams.get().baseTestPath;

  if (!customBaseTestFilePath) {
    console.info('Custom base test file path not supplied, working up directories to find "base.spec.ts"...');

    customBaseTestFilePath = findBaseTestPath(fileDir.dir);

    if (customBaseTestFilePath) {
      console.log('Found base.spec.ts in project: ', customBaseTestFilePath);
    } else {
      console.log('Not found base.spec.ts in project, using default base file');
    }
  }

  let baseTestFile = fs.readFileSync(path.join(__dirname, 'angular-dependencies.js'), 'utf8');

  baseTestFile = replaceModulePlaceholders(baseTestFile, _nodeModulesDir);

  baseTestFile = replaceCustomBaseTestFile(baseTestFile, customBaseTestFilePath || '');

  const webpackRequireContext = fs.readFileSync(path.join(__dirname, 'webpack-require-context.js'), 'utf8');

  const updatedWebPackRequireContext = replaceWebpackPlaceholders(webpackRequireContext, escapeRegExp(_fileDir), _escapedFileName);

  return baseTestFile + updatedWebPackRequireContext;
}

function getNodeModulesDir() {
  return path.join(process.cwd(), 'node_modules');
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

module.exports = updateBundle;
