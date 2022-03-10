/* globals require */
import 'core-js';
import 'zone.js';
import 'CUSTOM_BASE_TEST_FILE_PATH';

console.log('Running KARMA_FAST_FILE_NAME');

var appContext = require.context('KARMA_FAST_FILE_DIR', true, /KARMA_FAST_FILE_NAME$/);

appContext.keys().forEach(appContext);
