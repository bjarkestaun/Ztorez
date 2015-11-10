var brandController = require('./brandController.js');

module.exports = function (app) {
  app.get('/', brandController.getBrands);
  app.post('/', brandController.addBrand)
};
