(function() {
    angular
        .module('app')
        .controller('HistoryController',['$scope', '$http', '$sce', function($scope, $http, $sce){
        	$http.get('https://temple-website.firebaseio.com/history.json').then(function(response) {
            	 $scope.events = Object.keys(response.data.events).map(function(k) { 
                    return response.data.events[k] 
                });
            });

        }]);
})();