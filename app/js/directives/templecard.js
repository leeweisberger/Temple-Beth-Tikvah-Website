angular.module('app')
	.directive('templeCard', function () {
	    return {
	        templateUrl: 'views/templecard.html',
	        restrict: 'E',
	        scope: {
	        	cardText: '@',
	        	linkText: '@',
	        	cardTitle: '@',
	        	link: '@',
	        	image: '@'
	        }
	    };
	});