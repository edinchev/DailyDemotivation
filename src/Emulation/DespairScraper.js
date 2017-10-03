var webdriverio = require('webdriverio');
var fs = require('fs');

var options = {
  desiredCapabilities: {
    browserName: 'chrome',
  },
  logOutput: './Logs',
  logLevel: 'verbose',
};

//@todo Figure out how to make this work dynamically.
var url = 'https://despair.com/collections/demotivators?page=';

webdriverio.remote(options)
           .init()
           .url(url + '1')
           .getUrl()
           .then(function(url) {
             console.log('Parsing URL: ' + url);
           })
           .getText('.info .title')
           .then(function(titles) {
             createFile('titles-1.json', titles);
           })
           .getText('.info p')
           .then(function(descriptions) {
             createFile('descriptions-1.json',
                 descriptions);
           })
           .url(url + '2')
           .getUrl()
           .then(function(url) {
             console.log('Parsing URL: ' + url);
           })
           .getText('.info .title')
           .then(function(titles) {
             createFile('titles-2.json', titles);
           })
           .getText('.info p')
           .then(function(descriptions) {
             createFile('descriptions-2.json',
                 descriptions);
           })
           .end();

/**
 *
 * @param fileName
 * @param data
 */
function createFile(fileName, data) {
  console.log('Attempting to create file:' + fileName);

  var folder = './Data';

  fs.writeFile(folder + '/' + fileName, JSON.stringify(data),
      function(error) {
        if (error) {
          console.log('Error trying to create ' + fileName + ':' +
              error);
        }
        console.log(fileName + ' created.');
      });
}