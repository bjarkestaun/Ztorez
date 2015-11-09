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
  $scope.message = 'heya';
  console.log('hej');
});
// .run(function ($rootScope, $location) {
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {

//   });
// })