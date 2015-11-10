var express = require('express');

var locations = require('./locations/locationsController.js');
var brands = require('./brands/brandsController.js');

var app = express();

app.configure(function() {
  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'ejs');
  // app.use(partials());
  // app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  // app.use(express.cookieParser('shhhh, very secret'));
  // app.use(express.session());
});

app.get('/locations', locations.getAll);

// app.get('/create', util.checkUser, handler.renderIndex);

// app.get('/links', util.checkUser, handler.fetchLinks);
// app.post('/links', handler.saveLink);

// app.get('/login', handler.loginUserForm);
// app.post('/login', handler.loginUser);
// app.get('/logout', handler.logoutUser);

// app.get('/signup', handler.signupUserForm);
// app.post('/signup', handler.signupUser);

// app.get('/*', handler.navToLink);

module.exports = app;
