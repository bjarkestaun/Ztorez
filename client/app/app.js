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
        var name = location.name;
        var address = location.formattedAddress;
        var InfoWindowContent = '<div id="infowindow"><h4>' + name + '</h4><p>' + address + '</p></div>';
        var infowindow = new google.maps.InfoWindow({
          content: InfoWindowContent
        });
        marker.addListener('click', function () {
          console.log(location);
          infowindow.open(marker.get('map'), marker);
        });
      });
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
    var locationId = $scope.locations.reduce(function (total, location) {
      if(location.name === $scope.locationName) {
        return location._id;
      } else {
        return total;
      }
    }, null);
    var brandId = $scope.brands.reduce(function (total, brand) {
      if(brand.name === $scope.brandName) {
        return brand._id;
      } else {
        return total;
      }
    }, null);
    debugger;
    if(locationId && brandId) {
      var data = {
        locationId: locationId,
        brandId: brandId
      };
      Locations.addBrandToLocation(data);
    }
  };

});
