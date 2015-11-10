angular.module('ztorez.services', [])

.factory('Locations', function ($http) {
  
  var getLocations = function () {
    return $http({
      method: 'GET',
      url: '/api/locations'
    })
    .then(function (res) {
      console.log(res.data);
      return res.data;
    });
  };

  var addLocation = function (data) {
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/locations',
      data: data
    })
    .then(function (res) {
      return res.data;
    });
  }

  return {
    getLocations: getLocations,
    addLocation: addLocation
  };

});
