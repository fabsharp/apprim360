describe('Toggle Button', () => {
    beforeEach(() => {

    });

    afterEach(() => {
    });

    it('should hide the text box', () => {
        // All of wdio's commands are synchronous https://webdriver.io/docs/api.html
        $('#showHideButton').click();
        expect($('#textBox').isDisplayed()).toBe(false);
        browser.execute('APPRIM360.show()');
        expect($('#textBox').isDisplayed()).toBe(true);
    });
});
