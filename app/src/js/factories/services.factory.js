(function() {
  'use strict';

  angular
    .module('app')
    .directive('nave', serviceFactory);
  

  function serviceFactory() {
    return {
        templateUrl: 'views/navbar.html',
        restrict: 'E'
    };
  }
})();