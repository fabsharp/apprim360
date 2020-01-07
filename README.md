## Description of the problem with browserstack

I use [webdriver.io](https://webdriver.io/) to automate app testing build with Cordova. 

Everything works like a charm...Except when I try to [browser.execute](https://webdriver.io/docs/api/browser/execute.html).

```Error: The URL '/wd/hub/session/xxx/execute/sync' did not map to a valid resource```

I found a [workaround](https://github.com/webdriverio/webdriverio/issues/3264) by adding ```'browserstack.appium_version': '1.9.1'``` to capabilities 

But for device like ```{ 'device' : 'Samsung Galaxy S6', 'os_version' : '5.0' }``` :

```ERROR webdriver: Error: Appium version 1.9.1 is not supported on this device```

I tried  ```'browserstack.appium_version': '1.7.1' ``` but same first error (not map to a valid resource)

To reproduce the bug :
1. Compile the app
2. ```npm run test:browserstack```
    * upload the apk to browserstack cloud
    * launch test from **test/specs/basic.js**
    * (see **test/browserstack.js** for details)
    
Note :  You need to configure your browserstack username and password in https://github.com/fabsharp/apprim360/blob/master/package.json#L12

## Compile the app

1. You need [cordova](https://cordova.apache.org/) to be installed
2. ```npm install```
3. ```npm run build:android```

## Launch

* emulator ```npm run emulate:android```
* usb device ```npm run device:android```

## Test

* device or emulator (emulator need to be started first) ```npm run test:android```
* browserstack :
    * You need to configure your browserstack username and password in https://github.com/fabsharp/apprim360/blob/master/package.json#L12
    * ```npm run test:browserstack```

### What test does

In **www/index.html** there's this script : 
```
<script>
    window.APPRIM360 = {
        "hello" : "world",
        show : function() {
            document.getElementById('textBox').classList.remove('hidden');
        }
    };
</script>
```
We would like to get the APPRIM360 object in [test/specs/basic.js](https://github.com/fabsharp/apprim360/blob/master/test/specs/basic.js#L26) 
```
var apprim360 = browser.execute(function(done)  {
            return window.APPRIM360;
        });
expect(apprim360.hello === 'world').toBe(true);
```

