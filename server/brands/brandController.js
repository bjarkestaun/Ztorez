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
    var newBrand = new Brand({
      name: name,
    });
    newBrand.save(function (error, brand) {
      if(error) throw error;
    });
  }
  
}
