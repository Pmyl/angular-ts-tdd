/* globals require, module */

const webpackConfig = require('../webpack/webpack.config');
const shellParams = require('../../helpers/shellParams');

const workingRoot = require('../../helpers/workingRoot');
const path = require('path');
const root = require('../../helpers/root');
const shellParams = require('./helpers/shellParams');

module.exports = function(config) {
  'use strict';

  const bundlePath = path.join(root(), 'bundle.js');
  const parameters = shellParams.get();
  workingRoot.setDir(parameters.cwd);

  var _config = {
    basePath: '../../',
    frameworks: [
      'jasmine-spy-when',
      'jasmine'
    ],
    files: [
        ... shellParams.get().baseTestPath ? { pattern: shellParams.get().baseTestPath, watched: true }: {},
      { pattern: bundlePath, watched: true }
    ],
    preprocessors: {
      [bundlePath]: ['webpack']
    },
    webpackMiddleware: {
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: false,
        warnings: true,
        publicPath: false
      }
    },
    webpack: webpackConfig(),
    webpackServer: {
      noInfo: true
    },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.entry,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false
  };

  config.set(_config);
};
