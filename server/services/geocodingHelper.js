var http = require('http');
var request = require('request');

var options = {
  host: 'https://maps.googleapis.com',
  path: '/maps/api/geocode/',
  type: 'json',
  field: 'address',
  apiKey: 'AIzaSyA3UhCzh6LZ2NpnnyhrZllJaQ6quuh8jYM'
};

module.exports = function (rawAddress, cb) {
  request(options.host + options.path + 'json?address=' + rawAddress + '&key=' + options.apiKey, function (error, response, body) {
    if(error) cb(error);
    else cb(null, body);
  });
};

