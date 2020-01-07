exports.config = {
    specs: ['./test/specs/**/*.js'],

    framework: 'jasmine',

    reporters: ['spec'],

    // By default, Jasmine times out within 10 seconds. This is not really enough time
    // for us as it takes a while for Appium to get set up.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 90000
    }
}

