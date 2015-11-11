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
  $scope.selectedBrand = undefined;
  $scope.locationDetails = false;
  var map;
  var markers = [];
  var openInfoWindow = null;
  var selectedLocation = null;
   
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
      map = new google.maps.Map(mapCanvas, mapOptions);
      map.addListener('click', function () {
        if(openInfoWindow) openInfoWindow.close();
        $scope.locationDetails = false;
        $scope.$digest();
      });
      updateMarkers(locs);
    });
  };

  var updateMarkers = function (locs) {
    if(openInfoWindow) openInfoWindow.close();
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];
    locs.forEach(function (location) {
      var LatLng = new google.maps.LatLng(location.location.lat, location.location.lng);
      var marker = new google.maps.Marker({
        position: LatLng,
        map: map
      });
      var name = location.name;
      var address = location.formattedAddress;
      var InfoWindowContent = '<div id="infowindow"><h4>' + name + '</h4><p>' + address + '</p></div>';
      var infoWindow = new google.maps.InfoWindow({
        content: InfoWindowContent
      });
      markers.push(marker);
      marker.addListener('mouseover', function () {
        if(openInfoWindow) openInfoWindow.close();
        infoWindow.open(marker.get('map'), marker);
        openInfoWindow = infoWindow;
      });
      marker.addListener('mouseout', function () {
        if(openInfoWindow) openInfoWindow.close();
      })
      marker.addListener('click', function () {
        $scope.showLocationDetails(location);
      });
    });
  };

  $scope.showLocationDetails = function (location) {
    $scope.locationName = location.name;
    $scope.locationAddress = location.formattedAddress;
    $scope.location = location;
    $scope.brandNamesAtLocation = [];
    $scope.brands.forEach(function (brand) {
      if(location.brands.indexOf(brand._id) > -1) $scope.brandNamesAtLocation.push(brand.name);
    });
    $scope.locationDetails = true;
    $scope.$digest();
  };

  $scope.filterResults = function () {
    if($scope.selectedBrand === '') {
      updateMarkers($scope.locations);
    } else {
      var filteredLocations = [];
      $scope.locations.forEach(function (location) {
        if($scope.selectedBrand.locations.indexOf(location._id) > -1) filteredLocations.push(location);
      });
      updateMarkers(filteredLocations);
    }
  };

  getBrands(function (error, brands) {
    getLocations(function (error, locations) {
      google.maps.event.addDomListener(window, 'load', loadMap(locations));
    });
  });



  // functions that add locations and brands
  $scope.addBrand = function (brand) {
    var data = {
      name: brand
    };
    Brands.addBrand(data)
      .then(function (result) {
        $scope.addBrandToLocation(result);
      });
  };

  $scope.addLocation = function () {
    var data = {
      name: $scope.location.name,
      rawAddress: $scope.location.rawAddress
    };
    Locations.addLocation(data);
  };

  $scope.addBrandToLocation = function (brand) {
    var locationId = $scope.location._id;
    var brandId = brand._id;

    if(locationId && brandId) {
      var data = {
        locationId: locationId,
        brandId: brandId
      };
      Locations.addBrandToLocation(data)
        .then(function (result) {
          $scope.brandNamesAtLocation.push(brand.name);
          getBrands(function (error, brands) {
            getLocations(function (error, locations) {
            });
          });
        });
    }
  };

});
