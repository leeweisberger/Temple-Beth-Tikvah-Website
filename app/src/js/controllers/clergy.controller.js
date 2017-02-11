(function() {
    angular
        .module('app')
        .controller('ClergyController',['$scope', '$http', function($scope, $http){
        	$http.get('https://temple-website.firebaseio.com/clergy.json').then((response) => {
            	this.clergies = Object.keys(response.data.people).map((k) => { 
            		return response.data.people[k] 
        		});
            });
        }]);
})();