const Launcher = require('@wdio/cli').default;
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
let merge = require('deepmerge');
const formData = new FormData();
require('dotenv').config();

// Open file stream
const newFile = fs.createReadStream('platforms/android/app/build/outputs/apk/debug/app-debug.apk');
const username =  process.env.BROWSERSTACK_USERNAME;
const password =   process.env.BROWSERSTACK_ACCESS_KEY;
const devices = [{
    'device' : 'Samsung Galaxy S6',
    'os_version' : '5.0',
    'name': 'execute string',
}];

// Add form field params
formData.append('file', newFile, 'app-debug.apk');
formData.append('custom_id', 'npm_uploaded_apk');

axios({
    url: 'https://api-cloud.browserstack.com/app-automate/upload',
    method: 'post',
    headers: formData.getHeaders(),
    auth: {
        username: username,
        password: password,
    },
    data: formData,
    maxContentLength: 1073741824,
})
    .then(response => {
        // The object with the 'app_url' parameter is in the 'data' field of the response.
        console.log("UPLOADED to browserStack", response.data);
        let app_url = response.data.app_url;
        let capabilities = [];
        devices.forEach((device) => {
            capabilities.push(merge(device, {
                'browserstack.debug' : true,
                'build' :  process.env.BUILD,
                'app' : app_url,
                "autoWebview": true,
            }))
        });
        const wdio = new Launcher('./test/wdio.conf.js', {
            user: username,
            key: password,
            capabilities : capabilities
        });
        wdio.run().then((code) => {
            process.exit(code)
        }, (error) => {
            console.error('Launcher failed to start the test', error.stacktrace)
            process.exit(1)
        });
    })
    .catch((error) => {
        console.log('UPLOAD on browserstack FAIL', error);
    });
