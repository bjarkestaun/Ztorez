angular.module('ztorez', [
    'ngRoute',
    'ui.bootstrap',
    'ui.bootstrap.typeahead',
    'ztorez.map',
    'ztorez.services'
  ])

.controller('mainController', function ($scope, $filter, Locations, Brands) {

  var locations = [];
  $scope.selected = undefined;
  // $scope.brands = ['Acne', 'Eton', 'Ralph Lauren'];
   
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

  var getBrands = function () {
    Brands.getBrands()
      .then(function (brands) {
        $scope.brands = brands;
        console.log(brands);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var getLocations = function (map) {
    Locations.getLocations()
      .then(function (locations){
        locations.forEach(function (location) {
        var LatLng = new google.maps.LatLng(location.location.lat, location.location.lng);
        var marker = new google.maps.Marker({
          position: LatLng,
          map: map
        });
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
      getLocations(map);
    });
  };

  $scope.filterResults = function () {
    var filteredLocations = $filter('filter')(locations, {
      brand: $scope.brandFilter
    });
    loadMap(filteredLocations);
  };

  getBrands();
  google.maps.event.addDomListener(window, 'load', loadMap(locations));



  // functions that add locations and brands
  $scope.addLocation = function () {
    var data = {
      name: $scope.location.name,
      rawAddress: $scope.location.rawAddress
    };
    Locations.addLocation(data);
  };

  $scope.addBrand = function () {
    var data = {
      name: $scope.brand.name
    };
    Brands.addBrand(data);
  };

  $scope.addBrandToLocation = function () {
    var data = {
      locationId: $scope.locationId,
      brandId: $scope.brandId
    };
    Locations.addBrandToLocation(data);
  };

});
