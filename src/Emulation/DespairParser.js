var fs = require('fs');
var async = require('async');

fs.readFile('./Data/titles-1.json', 'utf8', function(error, data) {
  if (error) {
    console.log(error);
  }else{
    console.log(data);
  }
});

fs.readFile('./Data/descriptions-1.json', 'utf8', function(error, data) {
  if (error) {
    console.log(error);
  }else{
    console.log(data);
  }
});