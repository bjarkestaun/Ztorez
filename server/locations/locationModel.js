var mongoose = require('mongoose');
var getGeoData = require('../services/geocodingHelper.js');
var Promise = require('bluebird');

var LocationSchema = new mongoose.Schema({
  name: String,
  rawAddress: String,
  formattedAddress: String,
  location: {
    lat: Number,
    lng: Number
  }
});

LocationSchema.methods.addGeoData = function () {
  return getGeoData(this.rawAddress).bind(this)
    .then(function (rawResult) {
      var result = JSON.parse(rawResult);
      this.formattedAddress = result.results[0].formatted_address;
      this.location = result.results[0].geometry.location;
      console.log(this.formattedAddress);
      console.log(this.location);
    })
    .catch(function (error) {
      console.log(error);
    });
  
}

LocationSchema.pre('save', function (next) {
  this.addGeoData()
    .then(function () {
      next();
    })
    .catch(function (error) {
      console.log(error)
    });
  //   , function(error, rawResult) {
  //   if(error) throw error;
  //   else {
  //   }
  // });
});

module.exports = mongoose.model('Location', LocationSchema);
// var LocationStuff = mongoose.model('Location', LocationSchema);

// var newLoc = new LocationStuff({
//   name: 'bjarke',
//   rawAddress: '250 Taylor street, san francisco'
// });

// newLoc.save(function(err, loc) {
//   if(err) console.log(err);
//   else console.log(loc);
// });