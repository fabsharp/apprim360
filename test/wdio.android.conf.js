let merge = require('deepmerge');
let wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {
    // Use the Appium plugin for Webdriver. Without this, we would need to run appium
    // separately on the command line.
    services: [ 'appium' ],

    appium : {
        logPath : './logs/',
        args : {
            'allow-insecure' : 'chromedriver_autodownload'
        }
    },

    // 4723 is the default port for Appium
    port: 4723,

    // How much detail should be logged. The options are:
    // 'silent', 'verbose', 'command', 'data', 'result', 'error'
    logLevel: 'error',

    // This defines which kind of device we want to test on, as well as how it should be
    // configured.
    capabilities: [{
        // 'Android' or 'iOS'
        platformName: 'Android',

        // The version of the Android or iOS system
        // platformVersion: '8.1',

        // For Android, Appium uses the first device it finds using "adb devices". So, this
        // string simply needs to be non-empty.
        // For iOS, this must exactly match the device name as seen in Xcode.
        deviceName: 'any',

        // Where to find the .apk or .ipa file to install on the device. The exact location
        // of the file may change depending on your Cordova version.
        app: './platforms/android/app/build/outputs/apk/debug/app-debug.apk',

        // By default, Appium runs tests in the native context. By setting autoWebview to
        // true, it runs our tests in the Cordova context.
        autoWebview: true,

        // When set to true, it will not show permission dialogs, but instead grant all
        // permissions automatically.
        autoGrantPermissions: true
    }],
});