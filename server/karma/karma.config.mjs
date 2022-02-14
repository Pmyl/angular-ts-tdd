/* globals require, module */

import * as path from 'path';

import webpackConfig from '../webpack/webpack.config.mjs';
import * as shellParams from '../../helpers/shellParams.mjs';
import { setDir as setWorkingRootDir } from '../../helpers/workingRoot.mjs';
import { getRoot } from '../../helpers/root.mjs';

export default function(config) {
  'use strict';

  const bundlePath = path.join(getRoot(), 'bundle.js');
  const parameters = shellParams.get();
  setWorkingRootDir(parameters.cwd);

  var _config = {
    basePath: '../../',
    frameworks: [
      'jasmine-spy-when',
      'jasmine'
    ],
    files: [
      { pattern: bundlePath, watched: true }
    ],
    preprocessors: {
      [bundlePath]: ['webpack', 'sourcemap']
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
