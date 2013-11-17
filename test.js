'use strict';

describe("First", function () {
    it('should pass', function (done) {
        browser.get(BASE_URI + '/test.html')
            .then(function () {
                browser.findElement({css: 'body'}).getText()
                    .then(function (text) {
                        assert.equal(text, 'Hello, World!');
                        done();
                    });
            });
    });
});
