var http = require('http');
var request = require('request');
var Promise = require('bluebird');

var options = {
  host: 'https://maps.googleapis.com',
  path: '/maps/api/geocode/',
  type: 'json',
  field: 'address',
  apiKey: 'AIzaSyA3UhCzh6LZ2NpnnyhrZllJaQ6quuh8jYM'
};

module.exports = function (rawAddress) {
  return new Promise(function (resolve, reject) {
    request(options.host + options.path + 'json?address=' + rawAddress + '&key=' + options.apiKey, function (error, response, body) {
      if(error) reject(error);
      else resolve(body);
    });
  });
};

