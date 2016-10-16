(function() {
    angular
        .module('app')
        .controller('MembershipController',['$scope', '$http', '$sce', function($scope, $http, $sce){
        	$http.get('https://temple-website.firebaseio.com/membership.json').then(function(response) {
            	$scope.text = response.data.text;
            });
            $http.get('https://temple-website.firebaseio.com/membership.json').then(function(response) {
                $scope.memberships = Object.keys(response.data.memberships).map(function(k) { 
                    return response.data.memberships[k] 
                });
                $scope.membershipInfo = response.data.membershipInfo;
                $scope.membershipContact = response.data.membershipContact;
            });

            $scope.renderHtml = function(html_code){
    			return $sce.trustAsHtml(html_code);
			};
            // $scope.memberships = [{header: 'Regular Family Membership', text: '<p>membership</p>'},
                                    // {header: 'Small Fam', text: 'membership2'}];
            // $scope.membershipInfo = 'Temple Beth Tikvah offers a variety of membership packages designed to meet the needs of individuals and families throughout various stages of life.';
            // $scope.membershipContact = 'For more information on any of these membership packages or to ask for a complete packet of materials to be sent to you, call Janice Paul, Membership Chair, at 973-694-1616 (daytime or evening) or e-mail at jdp222@aol.com This e-mail address is being protected from spambots, you need JavaScript enabled to view it .';
        }]);
})();