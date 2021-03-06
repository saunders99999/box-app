'use strict';

(function() {
/* App Module */

var boxApp = angular.module('boxApp', [
  'ngRoute',
  'boxControllers',
  'boxFilters'
]);

// vary base routing
boxApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/boxes', {
        templateUrl: 'partials/boxes.html',
        controller: 'BoxController'
      }).
      otherwise({
        redirectTo: '/boxes'
      });
  }]);

})();
