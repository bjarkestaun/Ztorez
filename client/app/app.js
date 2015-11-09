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

  var loadMap = function () {
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
      center: new google.maps.LatLng(44, -80),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
  };

  google.maps.event.addDomListener(window, 'load', loadMap);

});
// .run(function ($rootScope, $location) {
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {

//   });
// })