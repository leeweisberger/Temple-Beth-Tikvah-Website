(function() {
    angular
        .module('app')
        .controller('ContributeController',['$scope', '$http', '$sce', function($scope, $http, $sce){
            $http.get('https://temple-website.firebaseio.com/contributions.json').then((response) => {
                this.funds = Object.keys(response.data.funds).map((k) => { 
                    response.data.funds[k].open = false;
                    return response.data.funds[k] 
                });

                this.packages = Object.keys(response.data.packages).map((k) => { 
                    response.data.packages[k].open = false;
                    return response.data.packages[k] 
                });
                
            });

            this.getIcon = function(open) {
                if (open) {
                    return 'keyboard_arrow_right';
                }
                return 'keyboard_arrow_down'
            }
        }]);
})();