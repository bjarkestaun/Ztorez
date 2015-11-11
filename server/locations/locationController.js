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
        console.error(error);
      });
  },

  getBrandedLocations: function (req, res) {
    var brandId = req.body.brandId;
    Promise.resolve(Location.find({
      brands: brandId
    }).exec())
      .then(function (locations) {
        res.status(200).send(locations);
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  
  addLocation: function (req, res) {
    var name = req.body.name;
    var rawAddress = req.body.rawAddress;
    var newLocation = new Location({
      name: name,
      rawAddress: rawAddress
    });
    newLocation.save(function (error, location) {
      if(error) throw error;
      console.log('done ', location);
    });
  },

  addBrandToLocation: function (req, res) {
    var brandId = req.body.brandId;
    var locationId = req.body.locationId;
    var promises = [];
    promises.push(Location.findByIdAndUpdate(locationId, {
      $addToSet: {'brands': brandId}
    }, function (error, location) {
      if(error) throw error;
    }));
    promises.push(Brand.findByIdAndUpdate(brandId, {
      $addToSet: {'locations': locationId}
    }, function (error, brand) {
      if(error) throw error;
    }));
    Promise.all(promises)
      .then(function () {
        res.status(201).send('created');
      });
  }

};
