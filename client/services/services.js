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
    })
  };

  return {
    getLocations: getLocations
  };

});
