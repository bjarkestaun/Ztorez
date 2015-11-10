var Promise = require('bluebird');
var request = require('request');
var Location = require('./locationModel.js');
var Brand = require('../brands/brandModel.js');
var geocodingHelper = require('../services/geocodingHelper.js');


module.exports = {
  
  getAllLocations: function (req, res) {
    Promise.resolve(Location.find().exec())
      .then(function (locations) {
        res.status(200).send(locations);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getBrandedLocations: function (req, res) {
    // code
  },
  
  addLocation: function (req, res) {
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
  },

  addBrandToLocation: function (req, res) {
    var brandId = req.body.brandId;
    var locationId = req.body.locationId;
    Location.findByIdAndUpdate(locationId, {
      $push: {'brands': brandId}
    }, function (error, location) {
      if(error) throw error;
    });
    Brand.findByIdAndUpdate(brandId, {
      $push: {'locations': locationId}
    }, function (error, brand) {
      if(error) throw error;
    });
  }

};
