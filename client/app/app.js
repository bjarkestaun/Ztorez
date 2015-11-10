angular.module('ztorez', [
    'ngRoute',
    'ui.bootstrap',
    'ui.bootstrap.typeahead',
    'ztorez.map',
    'ztorez.services'
  ])

.controller('mainController', function ($scope, $filter, Locations, Brands, Map) {

  $scope.locations = [];
  $scope.brands = [];
  $scope.selectedBrands = undefined;
   
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

  var getBrands = function (cb) {
    Brands.getBrands()
      .then(function (brands) {
        $scope.brands = brands;
        console.log($scope.brands);
        cb(null, brands);
      })
      .catch(function (error) {
        console.log(error);
        cb(error);
      });
  };

  var getLocations = function (cb) {
    Locations.getLocations()
      .then(function (locs){
        $scope.locations = locs;
        console.log($scope.locations);
        cb(null, locs);
      })
      .catch(function (error) {
        console.log(error);
        cb(error);
      });
  };

  var loadMap = function (locs) {
    getPosition(function(position) {
      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: new google.maps.LatLng(position.latitude, position.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);
      locs.forEach(function (location) {
        var LatLng = new google.maps.LatLng(location.location.lat, location.location.lng);
        var marker = new google.maps.Marker({
          position: LatLng,
          map: map
        });
      });
    });
  };

  var loadMapOld = function (locations) {
    getPosition(function(position) {
      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: new google.maps.LatLng(position.latitude, position.longitude),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(mapCanvas, mapOptions);
      if(!locations) getLocations(map);
      else getLocations(map, locations);
    });
  };

  $scope.filterResults = function () {
    if($scope.selectedBrands === '') {
      loadMap($scope.locations);
    } else {
      var filteredLocations = [];
      $scope.locations.forEach(function (location) {
        if($scope.selectedBrands.locations.indexOf(location._id)) filteredLocations.push(location);
      });
      console.log('filtered');
      console.log(filteredLocations);
      loadMap(filteredLocations);
    }
  };

  getBrands(function (error, brands) {
    getLocations(function (error, locations) {
      google.maps.event.addDomListener(window, 'load', loadMap(locations));
    });
  });



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
