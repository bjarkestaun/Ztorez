angular.module('ztorez', [
    'ngRoute',
    'ztorez.map'
  ])
// .config(function ($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'map/map.html',
//       controller: 'mapController'
//     });
// })
.controller('mainController', function ($scope) {

  var getPosition = function (cb) {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        cb(position.coords);
      });
    } else {
      // center on SF if user location not activated
      cb({
        latitude: 37.7593482,
        longitude: -122.4446662
      });
    }
  }

  var loadMap = function () {
    getPosition(function(position) {
      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: new google.maps.LatLng(position.latitude, position.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);
    });
  };

  google.maps.event.addDomListener(window, 'load', loadMap);

});
// .run(function ($rootScope, $location) {
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {

//   });
// })