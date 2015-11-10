var mongoose = require('mongoose');
var geocodingHelper = require('../services/geocodingHelper.js');

var LocationSchema = new mongoose.Schema({
  name: String,
  rawAddress: String,
  formattedAddress: String,
  location: {
    lat: Number,
    lng: Number
  }
});

LocationSchema.pre('save', function (next) {
  geocodingHelper(this.rawAddress, function(error, result) {
    if(error) throw error;
    else {
      this.formattedAddress = result.results[0].address_components.formatted_address;
      this.location = result.results[0].address_components.geometry.location;
      next();
    }
  });
});

module.exports = mongoose.model('Location', LocationSchema);
