(function() {
    angular
        .module('app')
        .controller('ClergyController',['$scope', '$http', '$sce', function($scope, $http, $sce){
        	$http.get('https://temple-website.firebaseio.com/people.json').then((response) => {
            	this.clergies = Object.keys(response.data.clergy).map((k) => { 
            		return response.data.clergy[k] 
        		});
                this.staffs = Object.keys(response.data.staff).map((k) => { 
                    return response.data.staff[k] 
                });

                this.otherStaffs = Object.keys(response.data.otherStaff).map((k) => { 
                    return response.data.otherStaff[k] 
                });
            });
            $scope.renderHtml = function(html_code) {
    			return $sce.trustAsHtml(html_code);
			};
        }]);
})();