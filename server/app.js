var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');


var brands = require('./brands/brandController.js');
var locations = require('./locations/locationController.js');

mongoose.connect('mongodb://localhost/ztorez');

var app = express();

app.use(express.static(__dirname + '/../client'));
app.use(morgan('dev'));
  
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../client/index.html');
});

app.get('/locations', locations.getAllLocations);
app.get('/locations/brands/:brandId', locations.getBrandedLocations);
app.post('/locations', locations.addLocation);

app.get('/brands', brands.getBrands);
app.post('/brands', brands.addBrand);


app.listen(process.env.PORT || 8000);

module.exports = app;
