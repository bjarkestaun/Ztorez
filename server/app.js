var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

// require('./config/middleware.js')(app, express);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
app.use(morgan('dev'));
  
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../client/index.html');
});

app.listen(process.env.PORT || 8000);

// module.exports = app;