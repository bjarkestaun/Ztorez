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
.controller('mainController', function ($scope, $filter) {

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
  };

  var locations = [
    {
      brand: 'eton',
      latitude: 37.7837657,
      longitude: -122.4090027
    },
    {
      brand: 'eton',
      latitude: 37.79,
      longitude: -122.4090027
    },
    {
      brand: 'acne',
      latitude: 37.78,
      longitude: -122.42
    },
    {
      brand: 'acne',
      latitude: 37.75,
      longitude: -122.44
    }
  ];

  var filteredLocations = $filter('filter')(locations, {});

  var test = $scope.filter;
  $scope.tester = test + ' hello';

  $scope.filteredResults = filteredLocations;

  var addLocations = function (map, locations) {
    locations.forEach(function (location) {
      var LatLng = new google.maps.LatLng(location.latitude, location.longitude);
      var marker = new google.maps.Marker({
        position: LatLng,
        map: map
      });
    });
  };

  var loadMap = function (locations) {
    getPosition(function(position) {
      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: new google.maps.LatLng(position.latitude, position.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);
      addLocations(map, locations);
    });
  };

  $scope.filterResults = function () {
    console.log($scope.brandFilter);
    var filteredLocations = $filter('filter')(locations, {
      brand: $scope.brandFilter
    });
    loadMap(filteredLocations);
  };

  google.maps.event.addDomListener(window, 'load', loadMap(locations));

});
