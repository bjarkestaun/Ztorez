angular.module('ztorez.services', [])

.factory('Locations', function ($http) {
  
  var getLocations = function () {
    return $http({
      method: 'GET',
      url: '/api/locations'
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  var getBrandedLocations = function (brandId) {
    return $http({
      method: 'GET',
      url: '/api/locations/brands/' + brandId
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  var addLocation = function (data) {
    return $http({
      method: 'POST',
      url: '/api/locations',
      data: data
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  var addBrandToLocation = function (data) {
    return $http({
      method: 'POST',
      url: '/api/locations/brands',
      data: data
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return {
    getLocations: getLocations,
    addLocation: addLocation,
    addBrandToLocation: addBrandToLocation
  };

})

.factory('Brands', function ($http) {

  var getBrands = function () {
    return $http({
      method: 'GET',
      url: '/api/brands'
    })
    .then(function (res) {
      return res.data;
    });
  };

  var addBrand = function (data) {
    return $http({
      method: 'POST',
      url: '/api/brands',
      data: data
    })
    .then(function (res) {
      return res.data;
    });
  };

  return {
    getBrands: getBrands,
    addBrand: addBrand
  };

})

.factory('Map', function ($http) {
  return {};
});
