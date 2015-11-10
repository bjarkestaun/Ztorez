var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var Location = require('../locations/locationModel.js');

var BrandSchema = new mongoose.Schema({
  name: String,
  locations: [{type: ObjectId, ref: Location}]
});

module.exports = mongoose.model('Brand', BrandSchema);
