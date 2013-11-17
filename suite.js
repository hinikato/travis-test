'use strict';

global.assert = require('chai').assert;
global.BASE_URI = 'http://localhost:8000';

var Mocha = require('mocha');
var path = require('path');
var fs = require('fs');
var wd = require('selenium-webdriver');

wd.promise.controlFlow().on('uncaughtException', function (e) {
    console.log("\nThe following error has occured:\n", e.stack);
    browser.quit();
    process.exit(1);
});

var browserName = 'phantomjs';
var timeout = 10000;
var capabilities = {};
var testTimeout = 10000;

function createBrowser(browserName, capabilities, timeout) {
    var cap = wd.Capabilities[browserName](),
        browser;

    cap.merge(capabilities);

    if (browserName == 'phantomjs') {
        browser = require('selenium-webdriver/phantomjs').createDriver(cap);
    } else {
        var builder = new wd.Builder();
        builder.usingServer('http://localhost:4444/wd/hub');

        browser = builder.withCapabilities(cap)
            .build();
    }

    browser.manage().timeouts().implicitlyWait(timeout);

    return browser;
}

var browser = createBrowser(browserName, capabilities, timeout);
global.browser = browser;

var mocha = new Mocha({
    timeout: testTimeout
});

var testFilePaths = [
    __dirname + '/test.js',
];

testFilePaths.forEach(function (filePath) {
    mocha.addFile(filePath);
});

mocha.run(function () {

});
