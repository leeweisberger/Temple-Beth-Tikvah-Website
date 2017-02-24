(function() {
    angular
        .module('app')
        .controller('MembershipController',['$scope', '$http', '$sce', function($scope, $http, $sce){
            $http.get('https://temple-website.firebaseio.com/membership.json').then((response) => {
                this.memberships = Object.keys(response.data.memberships).map((k) => {
                    response.data.memberships[k].open = false; 
                    return response.data.memberships[k] 
                });
                this.text = response.data.text;
                this.membershipInfo = response.data.membershipInfo;
                this.membershipContact = response.data.membershipContact;
                this.membershipInclusion = response.data.inclusion;
            });

            $scope.renderHtml = function(html_code) {
    			return $sce.trustAsHtml(html_code);
			};
            this.getIcon = function(open) {
                if (open) {
                    return 'keyboard_arrow_up';
                }
                return 'keyboard_arrow_down'
            }
        }]);
})();