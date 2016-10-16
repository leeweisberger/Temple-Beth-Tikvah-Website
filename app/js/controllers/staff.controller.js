(function() {
    angular
        .module('app')
        .controller('StaffController',['$scope', '$http', function($scope, $http){
        	$http.get('https://temple-website.firebaseio.com/staff.json').then(function(response) {
            	$scope.staffs = Object.keys(response.data.people).map(function(k) { 
            		return response.data.people[k] 
        		});
            });
        }]);
})();