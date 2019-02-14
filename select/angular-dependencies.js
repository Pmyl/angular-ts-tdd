/* globals require */

if (!CUSTOM_BASE_TEST_FILE_PATH) {
    require('NODE_MODULES_DIR/core-js/es6');
    require('NODE_MODULES_DIR/core-js/es7/reflect');

    require('NODE_MODULES_DIR/zone.js/dist/zone');
    require('NODE_MODULES_DIR/zone.js/dist/long-stack-trace-zone');
    require('NODE_MODULES_DIR/zone.js/dist/sync-test');
    require('NODE_MODULES_DIR/zone.js/dist/async-test');
    require('NODE_MODULES_DIR/zone.js/dist/fake-async-test');
    require('NODE_MODULES_DIR/zone.js/dist/proxy');
    require('NODE_MODULES_DIR/zone.js/dist/jasmine-patch');

    var coreTesting = require('NODE_MODULES_DIR/@angular/core/testing'),
        browserTesting = require('NODE_MODULES_DIR/@angular/platform-browser-dynamic/testing');

    coreTesting.TestBed.initTestEnvironment(
        browserTesting.BrowserDynamicTestingModule,
        browserTesting.platformBrowserDynamicTesting()
    );
} else {
    require(CUSTOM_BASE_TEST_FILE_PATH);
}

