(function() {
    angular
        .module('app')
        .controller('EducationController',['$scope', '$http', '$anchorScroll', function($scope, $http, $anchorScroll){
            $http.get('https://temple-website.firebaseio.com/education.json').
                then((response) => {
                    this.about = response.data.about;

                    this.offerings = Object.keys(response.data.offerings).map((key) => {
                        return response.data.offerings[key];
                    });

                    this.promises = response.data.promises;
                    this.specialNeeds = response.data.special_needs;
                    this.director = response.data.director;
                    this.bnais = response.data.bnai;
            });
            $scope.scrollTo = function (id) {
                $anchorScroll(id);  
            }         
        }]);
})();