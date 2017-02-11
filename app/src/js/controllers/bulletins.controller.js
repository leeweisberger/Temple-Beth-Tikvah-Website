(function() {
    angular
        .module('app')
        .controller('BulletinsController',['$scope', '$http', function($scope, $http){
            $http.get('https://temple-website.firebaseio.com/bulletins.json').
                then((response) => {
                    this.bulletins = Object.keys(response.data.bulletinFiles).map((key) => {
                        return response.data.bulletinFiles[key];
                    });
                    this.about = response.data.about;
            });
            
        }]);
})();