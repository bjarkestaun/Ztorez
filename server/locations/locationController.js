var Location = require('./locationModel.js');
var geocodingHelper = require('../services/geocodingHelper.js');
var Promise = require('bluebird');

module.exports = {
  
  getAllLocations: function (req, res, next) {
    Promise.resolve(Location.find().exec())
      .then(function (locations) {
        res.send(200, locations);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getBrandedLocations: function (req, res, next) {
    // code
  },
  
  addLocation: function (req, res, next) {
    console.log(req);
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
