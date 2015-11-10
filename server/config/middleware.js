module.exports = function(app, express) {

  var locationRouter = express.Router();
  var brandRouter = express.Router();
  
  app.use(express.static(__dirname + '/../client'));
  
  app.use('/', function(req, res) {
    res.sendFile(__dirname + '/../client/index.html');
  });

};