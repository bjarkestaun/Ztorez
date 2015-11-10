var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var brands = require('./brands/brandController.js');
var locations = require('./locations/locationController.js');

mongoose.connect('mongodb://ztorez:bjarke@ds053774.mongolab.com:53774/heroku_rq0x2pt9');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
app.use(morgan('dev'));
  
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../client/index.html');
});

app.get('/api/locations', locations.getAllLocations);
app.get('/api/locations/brands/:brandId', locations.getBrandedLocations);
app.post('/api/locations', locations.addLocation);
app.post('/api/locations/brands', locations.addBrandToLocation);

app.get('/api/brands', brands.getBrands);
app.post('/api/brands', brands.addBrand);


app.listen(process.env.PORT || 8000);

module.exports = app;
