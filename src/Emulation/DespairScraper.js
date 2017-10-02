var webdriverio = require('webdriverio');

var options = {
  desiredCapabilities: {
    browserName: 'chrome',
  },
  host: 'selenium-chrome.localhost',
  screenshotPath: './Screenshots',
  logOutput: './Logs',
  logLevel: 'verbose',
  debug: true,
  connectionRetryCount: 1
};

var url = 'https://despair.com/collections/demotivators';

var client = webdriverio.remote(options);

client.init()
      .url('http://google.com')
      .getTitle()
      .then(function(title) {
        console.log('Title was: ' + title);
      })
      .end();