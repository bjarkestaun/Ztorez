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
  geocodingHelper(this.rawAddress, function(error, rawResult) {
    if(error) throw error;
    else {
      var result = JSON.parse(rawResult);
      this.formattedAddress = result.results[0].formatted_address;
      this.location = result.results[0].geometry.location;
      next();
    }
  });
});

module.exports = mongoose.model('Location', LocationSchema);
var LocationStuff = mongoose.model('Location', LocationSchema);

var test = {}
test.body = {
  name: 'bjakre',
  rawAddress: '250 taylor street, san francisco'
};

var newLoc = new LocationStuff({
  name: 'bjarke',
  rawAddress: '250 Taylor street, san francisco'
});

newLoc.save(function(err, loc) {
  if(err) console.log(err);
  else console.log(loc);
});