var express = require('express');
var mongoose = require('mongoose');

var app = express();

// require('./config/middleware.js')(app, express);

app.use(express.static(__dirname + '/../client'));
  
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/../client/index.html');
});

app.listen(process.env.PORT || 8000);

// module.exports = app;