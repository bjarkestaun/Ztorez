var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var getGeoData = require('../services/geocodingHelper.js');
var Promise = require('bluebird');
var Brand = require('../brands/brandModel.js');

var LocationSchema = new mongoose.Schema({
  name: String,
  rawAddress: String,
  formattedAddress: String,
  location: {
    lat: Number,
    lng: Number
  },
  brands: [{type: ObjectId, ref: Brand}]
});

LocationSchema.methods.addGeoData = function () {
  return getGeoData(this.rawAddress).bind(this)
    .then(function (rawResult) {
      var result = JSON.parse(rawResult);
      this.formattedAddress = result.results[0].formatted_address;
      this.location = result.results[0].geometry.location;
    })
    .catch(function (error) {
      console.log(error);
    });
};

LocationSchema.methods.checkIfExists = function (cb) {
  module.exports.findOne({formattedAddress: this.formattedAddress}, function(error, location) {
    if(error) cb(error);
    else cb(null, location);
  });
};

LocationSchema.pre('save', function (next) {
  this.addGeoData()
    .then(function () {
      this.checkIfExists(function (error, location) {
        if(error) throw error;
        else {
          if(!location) {
            next();
          } else {
            console.log('location already exists');
          }
        }
      });
    })
    .catch(function (error) {
      console.log(error)
    });
});

module.exports = mongoose.model('Location', LocationSchema);

// LocationSchema.pre('save', function (next) {
//   this.addGeoData()
//     .then(function () {
//       next();
//     })
//     .catch(function (error) {
//       console.log(error)
//     });
// });