/* globals require */
var appContext = require.context('KARMA_FAST_FILE_DIR', true, /KARMA_FAST_FILE_NAME$/);

appContext.keys().forEach(appContext);
