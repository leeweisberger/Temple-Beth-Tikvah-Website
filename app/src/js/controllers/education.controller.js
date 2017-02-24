(function() {
    angular
        .module('app')
        .controller('EducationController',['$scope', '$http', '$anchorScroll', '$sce', function($scope, $http, $anchorScroll, $sce){
            $http.get('https://temple-website.firebaseio.com/education.json').
                then((response) => {
                    this.about = response.data.about;

                    this.religiousSchoolOfferings = Object.keys(response.data.religious).map((key) => {
                        return response.data.religious[key];
                    });

                    this.promises = response.data.promises;
                    this.specialNeeds = response.data.special_needs;
                    this.director = response.data.director;
                    this.bnais = response.data.bnai;

                    this.prek = response.data.prek;
                    this.weekend = response.data.weekend;
                    this.adult = response.data.adult;
                    this.other = response.data.other;
            });
            $scope.scrollTo = function (id) {
                $anchorScroll(id);  
            }
            $scope.renderHtml = function(html_code) {
                return $sce.trustAsHtml(html_code);
            };         
        }]);
})();