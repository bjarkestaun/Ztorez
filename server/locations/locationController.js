var Location = require('./locationModel.js');
var geocodingHelper = require('../services/geocodingHelper.js');

module.exports = {
  
  getAllLocations: function (req, res, next) {
    // code
  },

  getBrandedLocations: function (req, res, next) {
    // code
  },
  
  addLocation: function (req, res, next) {
    console.log(req.body);
    var name = req.body.name;
    var rawAddress = req.body.rawAddress;
    var newLocation = new Location({
      name: name,
      rawAddress: rawAddress
    });
    newLocation.save(function (error, location) {
      if(error) throw error;
    });
  }

};
