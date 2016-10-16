(function() {
    angular
        .module('app')
        .controller('ClergyController',['$scope', '$http', function($scope, $http){
        	$http.get('https://temple-website.firebaseio.com/clergy.json').then(function(response) {
            	$scope.clergies = Object.keys(response.data.people).map(function(k) { 
            		return response.data.people[k] 
        		});
            });
        }]);
})();