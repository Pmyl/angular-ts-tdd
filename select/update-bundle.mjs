/* globals require */
import * as fs from 'fs';
import * as path from 'path';
import * as root from '../helpers/root';
import * as shellParams from '../helpers/shellParams';
const generatedFileName = 'bundle.js';

function updateBundle(_fileDir, _escapedFileName) {
  'use strict';

  const fileNameEscaped = escapeRegExp(_escapedFileName);
  const fileContent = getFileContent(_fileDir, fileNameEscaped);

  fs.writeFileSync(path.join(root.getRoot(), generatedFileName), fileContent, 'utf8', function (err) {
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

function getFileContent(_fileDir, _escapedFileName) {
  let customBaseTestFilePath = shellParams.get().baseTestPath;

  if (!customBaseTestFilePath) {
    console.info('Custom base test file path not supplied, working up directories to find "base.spec.ts"...');

    customBaseTestFilePath = findBaseTestPath(fs.lstatSync(_fileDir).isDirectory() ? _fileDir : path.dirname(_fileDir));

    if (customBaseTestFilePath) {
      console.log('Found base.spec.ts in project: ', customBaseTestFilePath);
    } else {
      throw(new Error('Not found base.spec.ts in project, please supply a custom base test file'));
    }
  }

  const webpackRequireContext = fs.readFileSync(path.join(__dirname, 'webpack-require-context.js'), 'utf8');

  let updatedWebPackRequireContext = replaceWebpackPlaceholders(webpackRequireContext, escapeRegExp(_fileDir), _escapedFileName);

  updatedWebPackRequireContext = replaceCustomBaseTestFile(updatedWebPackRequireContext, customBaseTestFilePath || '');

  return updatedWebPackRequireContext;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/{}()*+?.\\^$|]/g, "\\$&");
}

module.exports = updateBundle;
