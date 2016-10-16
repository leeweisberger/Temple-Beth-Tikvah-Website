/**
 * @author ctola
 */
(function() {
    angular
        .module('app')
        .controller('HomeController', ['$scope', 'homePageData', function($scope, homePageData){
            this.welcomeText = "Lorem ipsum dolor sit amet, impedit pericula eum no. "+ 
        "Mel liber labores ad, sit ea choro corrumpit. Ut has semper vidisse evertitur, " +
        "laudem graeci reprehendunt est et, eros quidam percipit vel ea. Eius voluptatum nam " +
        "no, ipsum possim vim ei. Cum dicat ceteros te. No pri magna hendrerit, quod vide " +
        "omnium ea duo. Ei omnis fugit persequeris qui, te usu amet sumo iudico.";

        this.welcomeTitle = 'Welcome To Temple Beth Tikvah!';
        $scope.homeCards = Object.keys(homePageData.cards).map(function(k) { 
            return homePageData.cards[k] 
        });
        $scope.slides = Object.keys(homePageData.slides).map(function(k) { 
            return homePageData.slides[k] 
        });
        
        this.titleImage = 'img/temple.jpg';
        }]);
})();