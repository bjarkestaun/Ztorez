var mongoose = require('mongoose');

var BrandSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Brand', BrandSchema);
