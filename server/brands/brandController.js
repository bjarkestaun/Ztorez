var Brand = require('./brandModel.js');
var Promise = require('bluebird');

module.exports = {

  getBrands: function (req, res, next) {
    Promise.resolve(Brand.find().exec())
      .then(function (brands) {
        res.status(200).send(brands);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  addBrand: function (req, res, next) {
    var name = req.body.name;
    Brand.findOne({name: name}, function (error, brand) {
      if(error) throw error;
      else {
        if(!brand) {
          var newBrand = new Brand({
            name: name,
          });
          newBrand.save(function (error, brand) {
            if(error) throw error;
            res.status(201).send(brand);
          });
        } else {
          console.log('brand already exists');
          res.status(200).send(brand);
        }
      }
    });
  }

};
