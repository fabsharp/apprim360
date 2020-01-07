// tests/spec/button.js
// Note that when tests are run by webdriver.io, `browser` is a global object.

// "describe" is a wrapper used to group related tests. It makes the output from the
// test reporter much easier to read through.
describe('Toggle Button', () => {
    // As the name suggests, this runs before each test. It is a good place to set
    // up common settings.
    beforeEach(() => {
        // Wait up to 5 seconds for commands to work
        // browser.timeouts('implicit', 5000);
    });

    // It is important that we run each test in isolation. The running of a previous test
    // should not affect the next one. Otherwise, it could end up being very difficult to
    // track down what is causing a test to fail.
    afterEach(() => {
        //browser.reload();
    });

    it('should hide the text box', () => {
        // All of wdio's commands are synchronous, which means we can write them simply
        // one after another.
        $('#showHideButton').click();
        expect($('#textBox').isDisplayed()).toBe(false);
        var apprim360 = browser.execute(function(done)  {
            return window.APPRIM360;
        });
        expect(apprim360.hello === 'world').toBe(true);
    });
});
